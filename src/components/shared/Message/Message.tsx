import React from 'react';
import { MessageValue } from '../../../types/store';
import { filesToImage } from '../../../utils';
import './Message.css';
import { getIconFile } from '../../../utils/getIconFile';

interface MessageProps {
	message: MessageValue;
	openModal(img: string, editable: boolean): void;
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

	getTIMESTAMP(unix): string {
		const date = new Date(unix);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).substr(-2);
		const day = ('0' + date.getDate()).substr(-2);
		const hour = ('0' + date.getHours()).substr(-2);
		const minutes = ('0' + date.getMinutes()).substr(-2);
		const seconds = ('0' + date.getSeconds()).substr(-2);

		return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	}

	render(): React.ReactElement {
		const { files, images } = this.state;
		const { message } = this.props;
		const timeStamp = this.getTIMESTAMP(message.id);

		debugger;
		return (
			<div className="bodyMessage">
				<div className="textMessage">
					{this.props.message.text}
					<br />
					<div className='msgTimeStamp'>
						{timeStamp}
					</div>
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
