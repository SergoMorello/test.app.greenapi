import Core from "./Core";
import {
	Event
} from "easy-event-emitter";
import {
	Notification,
	Contact
} from "./Types";

class API extends Core {
	private static instance: API = new Core;

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
		API.instance.init(callback);
	}

	public static destroy(): void {
		API.instance.destroy();
	}

	public static getContacts(): Array<Contact> {
		var ret: Array<Contact> = [];
		const rawContacts = localStorage.getItem('contacts');
		if (rawContacts?.length) {
			const jsonContacts: any = JSON.parse(rawContacts);
			if (Array.isArray(jsonContacts)) {
				ret = jsonContacts;
			}
		}
		Core.contacts = ret;
		return ret;
	}

	private static saveContacts(contacts: Array<Contact>): void {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}

	public static pushContact(contact: Contact): void {
		Core.contacts.push(contact);
		API.saveContacts(Core.contacts);
	}

	public static updateContact(id: string, contact: Contact): void {
		//Core.contacts = Core.contacts.map((oldContact: Contact) => id === contact.id ? contact : oldContact);
		//API.saveContacts(Core.contacts);
	}

	public static hasContact(id: string): boolean {
		return Core.contacts.findIndex((contact: Contact) => contact.id === id) >= 0;
	}

	public static logout() {
		API.instance.stopNotifications();
		API.login('', '');
		API.events.emit('logout', true);
	}

	public static login(idInstance: string, apiTokenInstance: string): void {
		localStorage.setItem('idInstance', idInstance);
		localStorage.setItem('apiTokenInstance', apiTokenInstance);
		Core.user = {
			idInstance: idInstance,
			apiTokenInstance: apiTokenInstance
		};
		API.events.emit('login', true);
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

	public static getChatHistory(callback: Function): void {
		return API.instance.getChatHistory(callback);
	}

	public static getNotificationText(notification: Notification): string {
		return API.instance.getNotificationText(notification);
	}

	public static addChatListener(callback: Function, phoneStatic?: string): Event {
		return API.instance.addChatListener(callback, phoneStatic);
	}

	public static addListener(event: string, callback: Function): Event {
		return API.instance.addListener(event, callback);
	}
}

export default API;