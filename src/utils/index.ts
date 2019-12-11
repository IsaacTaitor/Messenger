import { PreviewImageStorage } from '../types/store';

export const dataURLToFile = (dataurl, filename) => {
	const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};

export const filesToImage = (file: PreviewImageStorage) => {
	return new Promise((resolve, reject) => {
		const promises = [];
		Object.keys(file).forEach(
			key => {
				if (file[key].type.indexOf('image') !== -1) {
					promises.push(
						new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.readAsDataURL(file[key]);
							reader.onloadend = () => {
								resolve({ image: reader.result, id: key });
							};
							reader.onerror = () => {
								reject(reader.error);
							};
						})
					);
				}
			}
		);

		Promise.all(promises).then(
			success => resolve(success)
		).catch(
			err => reject(err)
		);
	});
};