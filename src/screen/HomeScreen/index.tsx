import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageDND from '../../components/elements/MessageDND/MessageDND';
import ModalViewImage from '../../components/elements/ModalViewImage/ModalViewImage';
import { ApplicationStore, MessagesStore, PreviewImageStorage, ModalViewImageStore, MessageValue } from '../../types/store';
import './styles.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessage } from '../../redux/messages/messagesActions';
import { openModal, closeModal } from '../../redux/modalViewImage/modalViewImageActions';
import { addFilePreview, changeFilePreview, deleteFilePreview, clearFilesPreview } from '../../redux/previewImages/previewImagesActions';

interface HomeScreenProps {
	messagesStore: MessagesStore;
	previewImageStorage: PreviewImageStorage;
	modalViewImageStore: ModalViewImageStore;
	addMessage(Item: MessageValue): void;
	openModal(img: string, editable: boolean): void;
	closeModal(): void;
	addFilePreview(id: number, file: File): void;
	changeFilePreview(id: number, file: File): void;
	deleteFilePreview(id: number): void;
	clearFilesPreview(): void;
}

const mapStateToProps = (state: ApplicationStore) => ({
	messagesStore: state.messagesStore,
	modalViewImageStore: state.modalViewImageStore,
	previewImageStorage: state.previewImageStorage
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	addMessage: bindActionCreators(addMessage, dispatch),
	openModal: bindActionCreators(openModal, dispatch),
	closeModal: bindActionCreators(closeModal, dispatch),
	addFilePreview: bindActionCreators(addFilePreview, dispatch),
	changeFilePreview: bindActionCreators(changeFilePreview, dispatch),
	deleteFilePreview: bindActionCreators(deleteFilePreview, dispatch),
	clearFilesPreview: bindActionCreators(clearFilesPreview, dispatch)
});

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): React.ReactElement {
		const { messagesStore, previewImageStorage, modalViewImageStore,
			clearFilesPreview, addMessage, addFilePreview, openModal, closeModal } = this.props;
		return (
			<>
				<div className="background">
					<header style={{ background: 'white', height: '50px' }}>Чат</header>
					<div className="container">
						<div className="content">
							<MessageList messages={messagesStore} openModal={openModal} />
							<MessageDND
								addMessage={addMessage}
								addFilePreview={addFilePreview}
								clearFilesPreview={clearFilesPreview}
								openModal={openModal}
								modalViewImage={previewImageStorage}/>
						</div>
					</div>
				</div>
				<ModalViewImage modalViewImageStore={modalViewImageStore} closeModal={closeModal}/>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);