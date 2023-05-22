import EventEmitter,{ Events, Event } from "easy-event-emitter";
import {
	User,
	Settings,
	Message
} from "./Types";

type Query = {
	method: string;
	data?: {
		[index: string]: any;
	}
	success?(data: any): void;
	fail?(e: any): void;
	error?(e: any): void;
	complete?(e: any): void;
}

type MessageHistory = {
	chatId: string;
	extendedTextMessage: {
		text: string,
		description: string,
		title: string,
		previewType: string,
		jpegThumbnail: string
	};
	idMessage: string;
	sendByApi: boolean;
	statusMessage: string;
	textMessage: string;
	timestamp: number;
	type: ['incoming','outgoing'];
	typeMessage: string;
}

class Core {
	protected static events: Events = new EventEmitter;
	protected static user: User = {
		idInstance: '-',
		apiTokenInstance: '-'
	};
	private static urlAPI: string = 'https://api.green-api.com';
	private chatId: string = '';
	private notificationTimer: NodeJS.Timeout = setTimeout(()=>{});
	private static settings: Settings;

	public init(callback?: Function) {
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

	public destroy(): void {
		this.stopNotifications();
		Core.events.removeAllListeners();
	}

	private query(params: Query, method: string = 'POST'): void {
		//Заголовки от 200 до 299
		const success = (args: any) => {
			if (typeof params.success === 'function')
				params.success(args);
		};

		//Заголовки от 400 до 499
		const fail = (args: any) => {
			if (typeof params.fail === 'function') {
				params.fail(args);
			}
			
			Core.events.emit('api-request-fail', args);
		};

		//Все остальные
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

	private post(params: Query): void {
		this.query(params, 'POST');
	}

	private get(params: Query): void {
		this.query(params, 'GET');
	}

	public getId(): string {
		return Core.settings?.wid;
	}

	public setChatId(id: string): Core {
		this.chatId = id;
		Core.events.emit('changeChatId', this.chatId);
		return this;
	}

	public getChatId(): string {
		return this.chatId;
	}

	public sendMessage(text: string, phoneStatic?: string): void {
		const chatId: string = (phoneStatic ?? this.getChatId());
		this.post({
			method: 'SendMessage',
			data: {
				chatId: chatId,
				message: text
			},
			success: (message: Message) => {
				Core.events.emit(chatId, <Message>{
					idMessage: message.idMessage,
					senderData: {
						chatId: this.getId(),
					},
					messageData: {
						textMessageData: {
							textMessage: text
						}
					},
					type: 'outgoing'
				});
			}
		});
	}

	public startNotifications(): void {
		const start = () => {
			this.get({
				method: 'ReceiveNotification',
				success: (data) => {
					if (data) {
						Core.events.emit('reciveNotification', data);
						if (data.body && data.body?.typeWebhook === 'outgoingAPIMessageReceived') {
							const body: any = data?.body;
							Core.events.emit(data.body?.senderData?.chatId, body);
							this.setLastMessage({
								...body,
								chatId: body?.senderData.chatId,
								textMessage: body?.messageData?.extendedTextMessageData.text
							});
						}
						this.query({
							method: 'DeleteNotification',
							data: {
								receiptId: data.receiptId
							},
							error: (e) => {
								console.log(e)
							}
						},'DELETE');
					}
				}
			})
			this.notificationTimer = setTimeout(start, 1500);
		}
		start();
		
	}

	public stopNotifications(): void {
		clearTimeout(this.notificationTimer);
	}

	private setLastMessage(message: any) {
		Core.events.emit('lastChatMessage', message);
	}

	public getChat(callback: Function): void {
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

	public addNotificationListener(callback: Function): Event {
		return Core.events.addListener('reciveNotification', callback);
	}

	public addChatListener(callback: Function, phoneStatic?: string): Event {
		const chatId: string = (phoneStatic ?? this.getChatId());
		return Core.events.addListener(chatId, callback);
	}

	public addListener(event: string, callback: Function): Event {
		return Core.events.addListener(event, callback);
	}
}

export default Core;