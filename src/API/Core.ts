import * as whatsAppClient from "@green-api/whatsapp-api-client";
import EventEmitter,{ Events, Event } from "easy-event-emitter";
import {
	User,
	Settings,
	NewMessage
} from "./Types";

class Core {
	private static events: Events = new EventEmitter;
	protected static user: User = {
		idInstance: '-',
		apiTokenInstance: '-'
	};
	private chatId: string = '';
	private static settings: Settings;

	constructor(callback?: Function) {
		this.restAPI().settings.getSettings().then((settings: Settings) => {
			Core.settings = settings;
			this.startNotifications();
			callback!(true);
		}).catch((e: any) => {
			callback!(false, e);
		});
	}

	private restAPI(): any {
		return whatsAppClient.restAPI(Core.user);
	}

	public getId(): string {
		return Core.settings?.wid;
	}

	public setChatId(phone: string): Core {
		this.chatId = phone;
		Core.events.emit('changeChatId', phone);
		return this;
	}

	public getChatId(): string {
		return this.chatId;
	}

	public sendMessage(text: string, phoneStatic?: string): void {
		const phone: string = (phoneStatic ?? this.getChatId());
		if (!phone) {
			return;
		}
		const chatId = phone + '@c.us';
		this.restAPI().message.sendMessage(
			chatId,
			null,
			text
		).then((newMessage: NewMessage) => Core.events.emit(phone, {
			idMessage: newMessage.idMessage,
			chatId: chatId,
			textMessage: text
		}));
	}

	public async startNotifications(): Promise<void> {
		try {
			await this.restAPI().webhookService.startReceivingNotifications();
			
			this.restAPI().webhookService.onReceivingMessageText((body: any) => {
				console.log(body);
				this.restAPI().webhookService.stopReceivingNotifications();
				//console.log("Notifications is about to stop in 20 sec if no messages will be queued...")
			  });
			
			this.restAPI().webhookService.onReceivingDeviceStatus((body: any) => {
			  console.log(body);
			});
			this.restAPI().webhookService.onReceivingAccountStatus((body: any) => {
			  console.log(body);
			});
		  } catch (ex: any) {
			console.error(ex.toString());
		  }
	}

	public stopNotifications(): void {
		this.restAPI().webhookService.stopReceivingNotifications();
	}

	public getChat(callback: Function, phoneStatic?: string): void {
		const phone: string = (phoneStatic ?? this.getChatId());
		this.restAPI().message.getChatHistory(phone + '@c.us').then((data: any) => {
			if (Array.isArray(data)) {
				callback(data.reverse());
			}
		});
	}

	public addChatListener(callback: Function, phoneStatic?: string, ): Event {
		const phone: string = (phoneStatic ?? this.getChatId());
		return Core.events.addListener(phone, callback);
	}

	public addListener(event: string, callback: Function): Event {
		return Core.events.addListener(event, callback);
	}
}

export default Core;