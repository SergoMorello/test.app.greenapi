import Core from "./Core";
import { Events, Event } from "easy-event-emitter";

class API extends Core {
	private static instance: API = new API;
	
	public static setUser(idInstance: string, apiTokenInstance: string): void {
		API.instance.setUser(idInstance, apiTokenInstance);
	}

	public static getId(): string {
		return API.instance.getId();
	}

	public static sendMessage(phone: string, text: string): void {
		API.instance.sendMessage(phone, text);
	}

	public static getChat(phone: string): Promise<object> {
		return API.instance.getChat(phone);
	}

	public static addChatListener(phone: string, callback: Function): Event {
		return API.instance.addChatListener(phone, callback);
	}
}

export default API;