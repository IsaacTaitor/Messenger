import React from 'react';
import Message from '../../shared/Message/Message';
import { MessagesStore } from '../../../types/store';
import './MessageList.css';

interface MessageListProps {
	messages: MessagesStore;
}

export default class MessageList extends React.PureComponent<MessageListProps> {
	render(): any {
		return (
			<div className="divMessageList">
				{Object.values(this.props.messages).map(message => (
					<Message message={message} key={message.id}/>
				))}
			</div>
		);
	}
}