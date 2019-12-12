import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageDND from '../../components/elements/MessageDND/MessageDND';
import ModalViewImage from '../../components/elements/ModalViewImage/ModalViewImage';
import { ApplicationStore, MessagesStore, AttachedFilesStore, ModalViewImageStore, MessageValue } from '../../types/store';
import './styles.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessage } from '../../redux/messages/messagesActions';
import { openModal, closeModal } from '../../redux/modalViewImage/modalViewImageActions';
import { addAttachedFile, changeAttachedFile, deleteAttachedFile, clearAttachedFiles } from '../../redux/attachedFiles/attachedFilesActions';

interface HomeScreenProps {
	messagesStore: MessagesStore;
	attachedFilesStore: AttachedFilesStore;
	modalViewImageStore: ModalViewImageStore;
	addMessage(Item: MessageValue): void;
	openModal(img: string, editable: boolean): void;
	closeModal(): void;
	addAttachedFile(id: number, file: File): void;
	changeAttachedFile(id: number, file: File): void;
	deleteAttachedFile(id: number): void;
	clearAttachedFiles(): void;
}

const mapStateToProps = (state: ApplicationStore) => ({
	messagesStore: state.messagesStore,
	modalViewImageStore: state.modalViewImageStore,
	attachedFilesStore: state.attachedFilesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	addMessage: bindActionCreators(addMessage, dispatch),
	openModal: bindActionCreators(openModal, dispatch),
	closeModal: bindActionCreators(closeModal, dispatch),
	addAttachedFile: bindActionCreators(addAttachedFile, dispatch),
	changeAttachedFile: bindActionCreators(changeAttachedFile, dispatch),
	deleteAttachedFile: bindActionCreators(deleteAttachedFile, dispatch),
	clearAttachedFiles: bindActionCreators(clearAttachedFiles, dispatch)
});

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): React.ReactElement {
		const { messagesStore, attachedFilesStore, modalViewImageStore,
			clearAttachedFiles, changeAttachedFile, addMessage, addAttachedFile, deleteAttachedFile, openModal, closeModal } = this.props;
		return (
			<>
				<div className="background">
					<header className='header'></header>
					<div className="container">
						<div className="content">
							<MessageList messages={messagesStore} openModal={openModal} />
							<MessageDND
								addMessage={addMessage}
								addAttachedFile={addAttachedFile}
								deleteAttachedFile={deleteAttachedFile}
								clearAttachedFiles={clearAttachedFiles}
								openModal={openModal}
								modalViewImage={attachedFilesStore}/>
						</div>
					</div>
				</div>
				<ModalViewImage modalViewImageStore={modalViewImageStore} closeModal={closeModal} changeAttachedFile={changeAttachedFile}/>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);