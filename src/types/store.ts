export interface ApplicationStore {
	messagesStore: MessagesStore;
}

export interface MessagesStore {
	[id: number]: Message;
}

export interface Message {
	text: string;
	id: number;
	files: Array<File>;
}