import React from 'react';
import './Message.css';

interface MessageProps {
	text: string;
}

export default class Message extends React.PureComponent<MessageProps> {
	render(): any {
		return (
			<div className="bodyMessage">
				<div className="textMessage">{this.props.text}</div>
			</div>
		);
	}
}