export interface ApplicationStore {
	messagesStore: Array<Item>;
}

export interface Item { id: number; text: string }