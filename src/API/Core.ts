import EventEmitter,{
	Events,
	Event
} from "easy-event-emitter";

import {
	User,
	Settings,
	Message,
	Query,
	MessageHistory,
	Notification,
	Contact
} from "./Types";

/** Core api class */
class Core {
	protected static events: Events = new EventEmitter;
	protected static user: User = {
		idInstance: '-',
		apiTokenInstance: '-'
	};
	private static urlAPI: string = 'https://api.green-api.com';
	private static settings: Settings;
	protected static contacts: Array<Contact> = [];
	private chatId: string = '';
	private notificationTimer: NodeJS.Timeout = setTimeout(()=>{});

	/**
	 * First init function
	 * @param {Function} callback After init callback
	 * @returns {void}
	 */
	public init(callback?: Function): void {
		this.get({
			method: 'GetSettings',
			success: (settings: Settings) => {
				Core.settings = settings;
				this.startNotifications();
				callback!(true);
			},
			error: (e) => {
				callback!(false, e);
			}
		});
	}

	/**
	 * Delete all listeners and vars
	 * @returns {void}
	 */
	public destroy(): void {
		this.stopNotifications();
		Core.events.removeAllListeners();
	}

	/**
	 * Global query function
	 * @param {Query} params
	 * @param {string} method
	 * @returns {void}
	 */
	private query(params: Query, method: string = 'POST'): void {
		
		const success = (args: any) => {
			if (typeof params.success === 'function')
				params.success(args);
		};

		const fail = (args: any) => {
			if (typeof params.fail === 'function') {
				params.fail(args);
			}
			
			Core.events.emit('api-request-fail', args);
		};

		const error = (args: any) => {
			if (typeof params.error === 'function') {
				params.error(args);
			}
			
			Core.events.emit('api-request-error', args);
		};

		const complete = (args: any) => {
			if (typeof params.complete === 'function') {
				params.complete(args);
			}	

			Core.events.emit('api-request-complete', args);
		};
		const encodeUrlParams = (data: any, slash: boolean = false) => {
			if (!data) {
				return '';
			}
			const fnc = (k: any) => {
				return slash ? encodeURIComponent(data[k]) : encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
			};
			return Object.keys(data).map(fnc).join(slash ? '/' : '&');
		};
		const data = JSON.stringify(params.data);
		var url = Core.urlAPI + '/waInstance' + Core.user.idInstance + '/' + params.method + '/' + Core.user.apiTokenInstance;

		switch(method) {
			case 'GET':
				url += '?' + encodeUrlParams(params.data);
			break;
			case 'DELETE':
				url += '/' + encodeUrlParams(params.data, true);
			break;
		}

		const xhr = new XMLHttpRequest();

		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

		xhr.onreadystatechange = function() {
			if (this.readyState !== 4) {
				return;
			}
			
			const result: any = this.responseText ? JSON.parse(this.responseText) : {};
			
			if (this.status >= 200 && this.status <= 299) {
				success(result);
			}else{
				if (this.status >= 400 && this.status <= 499) {
					fail(result);
				}
				
				error(result);
			}
			complete(result);
		}

		xhr.send(data);
	}

	/**
	 * Request POST method
	 * @param {Query} params
	 * @returns {void}
	 */
	private post(params: Query): void {
		this.query(params, 'POST');
	}

	/**
	 * Request GET method
	 * @param {Query} params
	 * @returns {void}
	 */
	private get(params: Query): void {
		this.query(params, 'GET');
	}

	/**
	 * Get user id
	 * @returns {string}
	 */
	public getId(): string {
		return Core.settings?.wid;
	}

	/**
	 * Set chat id
	 * @param {string} id Chat id
	 * @returns {Core}
	 */
	public setChatId(id: string): Core {
		this.chatId = id;
		Core.events.emit('changeChatId', this.chatId);
		return this;
	}

	/**
	 * Get selected chat id
	 * @returns {string}
	 */
	public getChatId(): string {
		return this.chatId;
	}

	/**
	 * Send new message to selected chat
	 * @param {string} text Message text
	 * @returns {void}
	 */
	public sendMessage(text: string): void {
		const chatId: string = this.getChatId();
		this.post({
			method: 'SendMessage',
			data: {
				chatId: chatId,
				message: text
			},
			success: (message: Message) => {
				Core.events.emit(chatId, <Notification>{
					body: {
						idMessage: message.idMessage,
						senderData: {
							chatId: this.getId(),
						},
						messageData: {
							textMessageData: {
								textMessage: text
							}
						},
					}
					
				});
			}
		});
	}

	/**
	 * Get text from notification
	 * @param {Notification} notification Notification object
	 * @returns {string}
	 */
	public getNotificationText(notification: Notification): string {
		return notification.body?.messageData.typeMessage === 'extendedTextMessage' ?
		notification.body?.messageData.extendedTextMessageData!.text : notification.body?.messageData.textMessageData!.textMessage;
	}

	/**
	 * Start notification checker
	 * @returns {void}
	 */
	private startNotifications(): void {

		const deleteNotification = (receiptId: number) => {
			this.query({
				method: 'DeleteNotification',
				data: {
					receiptId: receiptId
				},
				error: (e) => {
					console.error(e)
				}
			},'DELETE');
		};
		
		const start = () => {
			this.get({
				method: 'ReceiveNotification',
				success: (data: Notification) => {
					if (data) {
						Core.events.emit('reciveNotification', data);
						if (data.body && (
							data.body.typeWebhook === 'outgoingAPIMessageReceived' || 
							data.body.typeWebhook === 'outgoingMessageReceived' ||
							data.body.typeWebhook === 'incomingMessageReceived'
						)) {
							
							Core.events.emit(data.body.senderData.chatId, data);
							this.setLastMessage(data);
						}
						deleteNotification(data.receiptId);
					}
				}
			})
			this.notificationTimer = setTimeout(start, 1500);
		}
		start();
		
	}

	/**
	 * Stop all notifications
	 * @returns {void}
	 */
	public stopNotifications(): void {
		clearTimeout(this.notificationTimer);
	}

	/**
	 * Set last message chat history
	 * @param {MessageHistory} message
	 * @returns {void}
	 */
	private setLastMessage(message: MessageHistory | Notification): void {
		const lastMessage: MessageHistory = <MessageHistory>message;
		if ('receiptId' in message) {
			lastMessage.chatId = message.body.senderData.sender;
			lastMessage.textMessage = this.getNotificationText(message);
			lastMessage.timestamp = message.body.timestamp;
			lastMessage.type = message.body.senderData.sender === this.getId() ? 'outgoing' : 'incoming';
		}
		if (lastMessage.type === 'incoming') {
			Core.events.emit('lastChatMessage', message);
		}
	}

	/**
	 * Get request for chat history
	 * @param {Function} callback Callback
	 * @returns {void}
	 */
	public getChatHistory(callback: Function): void {
		const chatId: string = this.getChatId();
		this.post({
			method: 'GetChatHistory',
			data: {
				chatId: chatId
			},
			success: (chat: Array<MessageHistory>) => {
				const dataChat = chat.reverse();
				callback(dataChat);
				if (dataChat.length > 0) {
					this.setLastMessage(dataChat[dataChat.length - 1]);
				}
			}
		});
	}

	/**
	 * Add global notification listener
	 * @param {Function} callback Callback
	 * @returns {Event}
	 */
	public addNotificationListener(callback: Function): Event {
		return Core.events.addListener('reciveNotification', callback);
	}

	/**
	 * Add chat listener
	 * @param {Function} callback Callback
	 * @returns {Event}
	 */
	public addChatListener(callback: Function): Event {
		return Core.events.addListener(this.getChatId(), callback);
	}

	/**
	 * Add event listener
	 * @param {string} event Event name
	 * @param {Function} callback Callback
	 * @returns {Event}
	 */
	public addListener(event: string, callback: Function): Event {
		return Core.events.addListener(event, callback);
	}
}

export default Core;