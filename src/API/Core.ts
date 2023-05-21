import * as whatsAppClient from "@green-api/whatsapp-api-client";
import EventEmitter,{ Events, Event } from "easy-event-emitter";
import {
	User,
	Settings,
	NewMessage
} from "./Types";

class Core {
	private static events: Events = new EventEmitter;
	private static user: User = {
		idInstance: '-',
		apiTokenInstance: '-'
	};
	private static settings: Settings;

	private restAPI(): any {
		return whatsAppClient.restAPI(Core.user);
	}

	public setUser(idInstance: string, apiTokenInstance: string): void {
		Core.user = {
			idInstance: idInstance,
			apiTokenInstance: apiTokenInstance
		};
		this.startNotifications();

		this.restAPI().settings.getSettings().then((settings: Settings) => {
			Core.settings = settings;
		});
	}

	public getId(): string {
		return Core.settings?.wid;
	}

	public sendMessage(phone: string, text: string): void {
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

	public startNotifications(): void {
		try {
			this.restAPI().webhookService.startReceivingNotifications();
			
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

	public async getChat(phone: string): Promise<object> {
		return await this.restAPI().message.getChatHistory(phone + '@c.us');
	}

	public addChatListener(phone: string, callback: Function): Event {
		return Core.events.addListener(phone, callback);
	}
}

export default Core;