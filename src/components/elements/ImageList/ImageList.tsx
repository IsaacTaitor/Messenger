import React from 'react';
import './ImageList.css';

interface ImageListProps {
	images:  Array<{
		id: number;
		title: string;
		image: any;
	}>;
	openModal(img: string, editable: boolean, id: number, title: string): void;
	deleteAttachedFile(id: number): void;
}

export default class ImageList extends React.PureComponent<ImageListProps> {
	render(): React.ReactElement {
		return (
			<div className="gallery">
				{this.props.images.map(({ image, id, title }) => <div
					key={id}
					className="image">
					<img
						src={image}
						alt={title}
						className='imgFlatList'
						onClick={(): void => this.props.openModal(image, true, id, title)} />
					<button onClick={() => this.props.deleteAttachedFile(id)} className='close' >X</button>
				</div>
				)}
			</div>
		);
	}
}
