export interface ApplicationStore {
	messagesStore: MessagesStore;
	modalViewImageStore: ModalViewImageStore;
}

export interface MessagesStore {
	[id: number]: MessageValue;
}

export interface MessageValue {
	text: string;
	id: number;
	files: Array<File>;
}

export interface ModalViewImageStore {
	isOpen: boolean;
	img: string;
}