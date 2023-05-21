import * as whatsAppClient from "@green-api/whatsapp-api-client";
import EventEmitter,{ Events, Event } from "easy-event-emitter";
import { User } from "./Types";

class Core {
	private static events: Events = new EventEmitter;
	private static user: User = {
		idInstance: '-',
		apiTokenInstance: '-'
	};

	private restAPI(): any {
		return whatsAppClient.restAPI(Core.user);
	}

	public setUser(idInstance: string, apiTokenInstance: string): void {
		Core.user = {
			idInstance: idInstance,
			apiTokenInstance: apiTokenInstance
		};
		this.startNotifications();
	}

	public sendMessage(phone: string, text: string): Promise<object> {
		return this.restAPI().message.sendMessage(
			phone + "@c.us",
			null,
			text
		);
	}

	public startNotifications(): void {
		try {
			this.restAPI().webhookService.startReceivingNotifications();
			
			this.restAPI().webhookService.onReceivingMessageText((body: any) => {
			  console.log(body);
			  this.restAPI().webhookService.stopReceivingNotifications();
			  //console.log("Notifications is about to stop in 20 sec if no messages will be queued...")
			});
			// restAPI.webhookService.onReceivingDeviceStatus((body) => {
			//   console.log(body);
			// });
			// restAPI.webhookService.onReceivingAccountStatus((body) => {
			//   console.log(body);
			// });
		  } catch (ex: any) {
			console.error(ex.toString());
		  }
	}

	public getChat(phone: string, callback: Function): void {
		this.restAPI().message.getChatHistory(phone + '@c.us').then((data: Array<any>) => {
			callback(data);
		});
	}

	public addListenerChat(phone: string, callback: Function): Event {
		return Core.events.addListener(phone, callback);
	}
}

export default Core;