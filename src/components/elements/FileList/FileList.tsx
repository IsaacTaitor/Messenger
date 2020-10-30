import React from 'react';
import { getIconFile } from '../../../utils/getIconFile';
import './FileList.css';

interface FileListProps {
	files: {
		[id: number]: {
			title: string;
			type: string;
		};
	};
	deleteAttachedFile(id: number): void;
}

export default class FileList extends React.PureComponent<FileListProps> {
	render(): React.ReactElement {
		const { files } = this.props;
		return (
			<div className="files">
				{Object.keys(files).map(key =>
					<div key={key} className='file'>
						<div className='bodyFile'>
							{getIconFile({ type: files[key].type })}
							<div className='titleFile'>
								{files[key].title}
							</div>
						</div>
						<button onClick={() => this.props.deleteAttachedFile(Number(key))} className='close' >X</button>
					</div>
				)}
			</div>
		);
	}
}
