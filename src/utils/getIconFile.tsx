import React from 'react';

interface FileProps {
	type: string;
}

const icon = {
	mp3: require('../assets/img/fileExtension/mp3-file-format-symbol.png'),
	docx: require('../assets/img/fileExtension/docx-file-format-symbol.png'),
	doc: require('../assets/img/fileExtension/doc-file-format.png'),
	txt: require('../assets/img/fileExtension/txt-file-symbol.png'),
	default: require('../assets/img/fileExtension/file.png')
};

export const getIconFile = ({ type }: FileProps): React.ReactElement => {
	let selectedIcon = icon.default;
	if (type.includes('audio/mp3')) {
		selectedIcon = icon.mp3;
	} else if (type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
		selectedIcon = icon.docx;
	} else if (type.includes('application/msword')) {
		selectedIcon = icon.doc;
	} else if (type.includes('text/plain')) {
		selectedIcon = icon.txt;
	}

	return (
		<img className='icon' src={selectedIcon} alt='file extension icon'/>
	);
};