export interface ApplicationStore {
	messagesStore: MessagesStore;
}

export interface MessagesStore {
	[id: number]: MessageValue;
}

export interface MessageValue {
	text: string;
	id: number;
	files: Array<File>;
}