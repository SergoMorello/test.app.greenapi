export type User = {
	idInstance: string;
	apiTokenInstance: string;
}

export type Settings = {
	wid: string;
}

export type Message = {
	idMessage: string;
	senderData: {
		chatId: string;
	};
	messageData: {
		textMessageData: {
			textMessage: string;
		};
	};
	
}

export type Query = {
	method: string;
	data?: {
		[index: string]: any;
	}
	success?(data: any): void;
	fail?(e: any): void;
	error?(e: any): void;
	complete?(e: any): void;
}

export type MessageHistory = {
	chatId: string;
	extendedTextMessage?: {
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
	typeMessage: ['textMessage', 'extendedTextMessage'];
}

export type Notification = {
	receiptId: number;
	body: {
		typeWebhook: string;
		instanceData: {
			idInstance: number;
			wid: string;
			typeInstance: string;
		};
		timestamp: number;
		idMessage: string;
		senderData: {
			chatId: string;
			chatName: string;
			sender: string;
			senderName: string;
		};
		messageData: {
			typeMessage: string;
			textMessageData?: {
				textMessage: string;
			};
			extendedTextMessageData?: {
				text: string;
				description: string;
				title: string;
				previewType: string;
				jpegThumbnail: string;
			};
		};
	};
}

export type Contact = {
	id: string;
	title: string;
	message: string;
	timestamp: number;
}