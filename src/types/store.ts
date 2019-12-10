export interface ApplicationStore {
	messagesStore: MessagesStore;
	modalViewImageStore: ModalViewImageStore;
	previewImageStorage: PreviewImageStorage;
}

export interface MessagesStore {
	[id: number]: MessageValue;
}

export interface MessageValue {
	text: string;
	id: number;
	files: PreviewImageStorage;
}

export interface ModalViewImageStore {
	isOpen: boolean;
	img: string;
	editable: boolean;
}

export interface PreviewImageStorage {
	[id: number]: File;
}