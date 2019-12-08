import React from 'react';
import { MessageValue  } from '../../../types/store';
import './Message.css';

interface MessageProps {
	message: MessageValue;
}

interface MessageState {
	imgs: any;
}

export default class Message extends React.PureComponent<MessageProps, MessageState> {
	state = {
		imgs: []
	}
	render(): any {
		return (
			<div className="bodyMessage">
				<div className="textMessage">{this.props.message.text}
					{this.props.message.files.length ? this.state.imgs : null}
				</div>
			</div>
		);
	}

	componentDidMount(): void {
		const { files } = this.props.message;
		if (files.length) {
			files.forEach(
				file => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onloadend = (): void => {
						this.setState(prevState => ({ imgs: prevState.imgs.concat(<img src={reader.result as any} style={{maxHeight: '150px', maxWidth: '150px'}}/>) }));
					};
				}
			);
		}
	}
}