import Core from "./Core";
import { Events, Event } from "easy-event-emitter";

class API extends Core {
	private static instance: API;

	public static autoLogin(callback: Function): void {
		const idInstance = localStorage.getItem('idInstance');
		const apiTokenInstance = localStorage.getItem('apiTokenInstance');
		API.configure(idInstance, apiTokenInstance, callback);
	}

	public static configure(idInstance: string | null, apiTokenInstance: string | null, callback?: Function): void {
		if (!idInstance || !apiTokenInstance) {
			callback!(false);
			return;
		}
		API.login(idInstance, apiTokenInstance);
		API.instance = new Core(callback);
	}

	public static logout() {
		API.instance.stopNotifications();
		API.login('', '');
	}

	public static login(idInstance: string, apiTokenInstance: string): void {
		localStorage.setItem('idInstance', idInstance);
		localStorage.setItem('apiTokenInstance', apiTokenInstance);
		Core.user = {
			idInstance: idInstance,
			apiTokenInstance: apiTokenInstance
		};
	}

	public static getId(): string {
		return API.instance.getId();
	}

	public static sendMessage(phone: string, text: string): void {
		API.instance.sendMessage(phone, text);
	}

	public static setChatId(phone: string): Core {
		return API.instance.setChatId(phone);
	}

	public static getChatId(): string {
		return API.instance.getChatId();
	}

	public static getChat(callback: Function, phoneStatic?: string): void {
		return API.instance.getChat(callback, phoneStatic);
	}

	public static addChatListener(callback: Function, phoneStatic?: string): Event {
		return API.instance.addChatListener(callback, phoneStatic);
	}

	public static addListener(event: string, callback: Function): Event {
		return API.instance.addListener(event, callback);
	}
}

export default API;