import Core from "./Core";
import { Events, Event } from "easy-event-emitter";

class API extends Core {
	private static instance: API = new API;
	
	public static setUser(idInstance: string, apiTokenInstance: string): void {
		API.instance.setUser(idInstance, apiTokenInstance);
	}

	public static sendMessage(phone: string, text: string): Promise<object> {
		return API.instance.sendMessage(phone, text);
	}

	public static getChat(phone: string, callback: Function): void {
		API.instance.getChat(phone, callback);
	}

	public static addListenerChat(phone: string, callback: Function): Event {
		return API.instance.addListenerChat(phone, callback);
	}
}

export default API;