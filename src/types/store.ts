export interface ApplicationStore {
	messagesStore: MessagesStore;
	modalViewImageStore: ModalViewImageStore;
	attachedFilesStore: AttachedFilesStore;
}

export interface MessagesStore {
	[id: number]: MessageValue;
}

export interface MessageValue {
	text: string;
	id: number;
	files: AttachedFilesStore;
}

export interface ModalViewImageStore {
	isOpen: boolean;
	id: number;
	img: string;
	editable: boolean;
	title: string;
}

export interface AttachedFilesStore {
	[id: number]: File;
}