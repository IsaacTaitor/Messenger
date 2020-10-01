import React from 'react';
import { MessageValue } from '../../../types/store';
import { filesToImage } from '../../../utils';
import './Message.css';
import { getIconFile } from '../../../utils/getIconFile';
import ReactMoment from 'react-moment';

interface MessageProps {
	message: MessageValue;
	openModal(img: string, editable: boolean): void;
	removeMessage(id: number): void;
}

interface MessageState {
	images: Array<{ id: number; file: any }>;
	files: {
		[id: number]: {
			title: string;
			type: string;
			src: string;
		};
	};
}

export default class Message extends React.PureComponent<MessageProps, MessageState> {
	state = {
		images: [],
		files: []
	}

	render(): React.ReactElement {
		const { files, images } = this.state;
		const { message } = this.props;

		return (
			<div className="bodyMessage">
				<button onClick={() => this.props.removeMessage(message.id)}>X</button>
				<div className="textMessage">
					{this.props.message.text}
					<div className='imagesList'>
						{images.map(({ image, id }) =>
							<img
								src={image}
								className="imageMessage"
								alt="img"
								key={id}
								onClick={(): void => this.props.openModal(image, false)} />
						)}
					</div>
					<div className='filesList'>
						{files.map(id =>
							<div key={id} className='file'>
								<div className='fileBody'>
									{getIconFile({ type: message.files[id].type })}
									<div className='titleFile'>
										{message.files[id].name}
									</div>
								</div>
							</div>
						)}
					</div>
					<ReactMoment className='msgTimeStamp' format="DD/MM/YYYY hh:mm:ss">
						{message.id}
					</ReactMoment>
				</div>
			</div>
		);
	}

	componentDidMount = async () => {
		const files = [];
		const modalViewImage = this.props.message.files;
		Object.keys(modalViewImage).forEach(
			key => {
				if (modalViewImage[key].type.indexOf('image') === -1) {
					files.push(key);
				}
			}
		);
		const images = await filesToImage(modalViewImage);
		this.setState({ images: images as any, files });
	}
}
