import React from 'react';
import './Message.css';

export default class Message extends React.PureComponent<{ text: string }> {
	render(): any {
		return (
			<div className="bodyMessage">
				<div className="textMessage">{this.props.text}</div>
			</div>
		);
	}
}