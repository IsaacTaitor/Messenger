import React from 'react';
import './Message.css';

interface MessageProps {
	item: any;
}

interface MessageState {
	result: any;
}

export default class Message extends React.PureComponent<MessageProps, MessageState> {
	state = {
		result: ''
	}
	render(): any {
		if (this.props.item.files.length) {
			const reader = new FileReader();
			reader.readAsDataURL(this.props.item.files[0]);
			reader.onloadend = () => {
				this.setState({ result: reader.result });
			};
		}
		return (
			<div className="bodyMessage">
				<div className="textMessage">{this.props.item.newItem.text}
					{this.props.item.files.length ? <img src={this.state.result} style={{maxHeight: '100px', maxWidth: '100px'}}/> : null}
				</div>
			</div>
		);
	}
}