import Core from "./Core";
import {
	Event
} from "easy-event-emitter";
import {
	Notification,
	Contact
} from "./Types";

/** API class */
class API extends Core {
	private static instance: API = new Core;

	/**
	 * Auto login function
	 * @param {Function} callback Callback after login and init
	 * @returns {void}
	 */
	public static autoLogin(callback: Function): void {
		const idInstance = localStorage.getItem('idInstance');
		const apiTokenInstance = localStorage.getItem('apiTokenInstance');
		API.configure(idInstance, apiTokenInstance, callback);
	}

	/**
	 * Main configure user data
	 * @param {string|null} idInstance
	 * @param {string|null} apiTokenInstance
	 * @param {Function} callback
	 * @returns {void}
	 */
	public static configure(idInstance: string | null, apiTokenInstance: string | null, callback?: Function): void {
		if (!idInstance || !apiTokenInstance) {
			callback!(false);
			return;
		}
		API.login(idInstance, apiTokenInstance);
		API.instance.init(callback);
	}

	/**
	 * Delete all listeners and vars
	 * @returns {void}
	 */
	public static destroy(): void {
		API.instance.destroy();
	}

	/**
	 * Get contacts array
	 * @returns {Array<Contact>}
	 */
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

	/**
	 * Save contacts array to local storage
	 * @param {Array<Contact>} contacts
	 * @returns {void}
	 */
	private static saveContacts(contacts: Array<Contact>): void {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}

	/**
	 * Push new contact
	 * @param {Contact} contact Contact object
	 * @returns {void}
	 */
	public static pushContact(contact: Contact): void {
		Core.contacts.push(contact);
		API.saveContacts(Core.contacts);
	}

	/**
	 * Get contact by id
	 * @param {string} id
	 * @returns {Contact|undefined}
	 */
	public static getContact(id: string): Contact | undefined {
		return Core.contacts.find((contact: Contact) => contact.id === id);
	}

	/**
	 * Update contact from id
	 * @param {string} id
	 * @param {Contact} contact
	 * @returns {void}
	 */
	public static updateContact(id: string, contact: Contact): void {
		Core.contacts = Core.contacts.map((currentContact: Contact) => {
			if (currentContact.id === id) {
				return contact;
			}
			return currentContact;
		});
		API.saveContacts(Core.contacts);
	}

	/**
	 * Check exists contact
	 * @param {string} id
	 * @returns {boolean}
	 */
	public static hasContact(id: string): boolean {
		return Core.contacts.findIndex((contact: Contact) => contact.id === id) >= 0;
	}

	/**
	 * Logout
	 * @returns {void}
	 */
	public static logout(): void {
		API.instance.stopNotifications();
		API.login('', '');
		Core.contacts = [];
		API.saveContacts(Core.contacts);
		API.events.emit('logout', true);
	}

	/**
	 * Login
	 * @param {string} idInstance
	 * @param {string} apiTokenInstance
	 * @returns {void}
	 */
	public static login(idInstance: string, apiTokenInstance: string): void {
		localStorage.setItem('idInstance', idInstance);
		localStorage.setItem('apiTokenInstance', apiTokenInstance);
		Core.user = {
			idInstance: idInstance,
			apiTokenInstance: apiTokenInstance
		};
		API.events.emit('login', true);
	}

	/**
	 * Get user id
	 * @returns {string}
	 */
	public static getId(): string {
		return API.instance.getId();
	}

	/**
	 * Send new message to selected chat
	 * @param {string} text Message text
	 * @returns {void}
	 */
	public static sendMessage(text: string): void {
		API.instance.sendMessage(text);
	}

	/**
	 * Set chat id
	 * @param {string} id Chat id
	 * @returns {Core}
	 */
	public static setChatId(id: string): Core {
		return API.instance.setChatId(id);
	}

	/**
	 * Get selected chat id
	 * @returns {string}
	 */
	public static getChatId(): string {
		return API.instance.getChatId();
	}

	/**
	 * Get request for chat history
	 * @param {Function} callback Callback
	 * @returns {void}
	 */
	public static getChatHistory(callback: Function): void {
		return API.instance.getChatHistory(callback);
	}

	/**
	 * Get text from notification
	 * @param {Notification} notification Notification object
	 * @returns {string}
	 */
	public static getNotificationText(notification: Notification): string {
		return API.instance.getNotificationText(notification);
	}

	/**
	 * Add chat listener
	 * @param {Function} callback Callback
	 * @returns {Event}
	 */
	public static addChatListener(callback: Function): Event {
		return API.instance.addChatListener(callback);
	}
	
	/**
	 * Add event listener
	 * @param {string} event Event name
	 * @param {Function} callback Callback
	 * @returns {Event}
	 */
	public static addListener(event: string, callback: Function): Event {
		return API.instance.addListener(event, callback);
	}
}

export default API;