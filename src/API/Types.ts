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