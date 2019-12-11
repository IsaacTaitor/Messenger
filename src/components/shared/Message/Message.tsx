import React from 'react';
import { MessageValue } from '../../../types/store';
import { filesToImage } from '../../../utils';
import './Message.css';

interface MessageProps {
	message: MessageValue;
	openModal(img: string, editable: boolean): void;
}

interface MessageState {
	files: Array<{ id: number; file: any }>;
}

export default class Message extends React.PureComponent<MessageProps, MessageState> {
	state = {
		files: []
	}
	render(): React.ReactElement {
		return (
			<div className="bodyMessage">
				<div className="textMessage">
					{this.props.message.text}
					<div style={{
						maxHeight: '200px',
						display: 'relative'
					}}>
						{this.state.files.map(({ file, id }) => 
							<img
								src={file}
								className="imageMessage"
								alt=""
								key={id}
								onClick={(): void => this.props.openModal(file, false)} />
						)}
					</div>
				</div>
			</div>
		);
	}

	componentDidMount(): void {
		const { files } = this.props.message;
		filesToImage(files).then(
			files => {
				if (JSON.stringify(this.state.files) !== JSON.stringify(files)) {
					this.setState({ files: files as any });
				}
			}
		);
	}
}