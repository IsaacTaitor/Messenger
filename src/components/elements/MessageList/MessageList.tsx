import React from 'react';
import Message from '../../shared/Message/Message';
import { MessagesStore } from '../../../types/store';
import './MessageList.css';

interface MessageListProps {
	messages: MessagesStore;
	openModal(img: string, editable: boolean): void;
}

export default class MessageList extends React.PureComponent<MessageListProps> {
	render(): React.ReactElement {
		return (
			<div className="divMessageList">
				{Object.values(this.props.messages).map(message =>
					<Message message={message} key={message.id} openModal={this.props.openModal}/>
				)}
			</div>
		);
	}
}