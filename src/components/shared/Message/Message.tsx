import React from 'react';
import { MessageValue } from '../../../types/store';
import './Message.css';

interface MessageProps {
	message: MessageValue;
	openModal(img: string, editable: boolean): void;
}

interface MessageState {
	imgs: Array<React.ReactElement>;
}

export default class Message extends React.PureComponent<MessageProps, MessageState> {
	state = {
		imgs: []
	}
	render(): React.ReactElement {
		return (
			<div className="bodyMessage">
				<div className="textMessage">{this.props.message.text}
					{this.state.imgs}
				</div>
			</div>
		);
	}

	componentDidMount(): void {
		const { files } = this.props.message;
		Object.values(files).forEach(
			file => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = (): void => {
					const id = Date.now();
					this.setState(prevState => ({
						imgs: prevState.imgs.concat(
							<img
								src={`${reader.result}`}
								className="imageMessage"
								alt=""
								key={file.lastModified + file.name + id}
								onClick={(): void => this.props.openModal(String(reader.result), false)} />)
					})
					);
				};
			}
		);
	}
}