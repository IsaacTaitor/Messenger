import React from 'react';
import Message from '../../shared/Message/Message';
import { Item } from '../../../types/store';
import './MessageList.css';

export default class MessageList extends React.PureComponent<{ messages: any }> {
	render(): any {
		return (
			<div className="divMessageList">
				{this.props.messages.map(item => (
					<Message item={item} key={item.newItem.id}/>
				))}
			</div>
		);
	}
}