import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageDND from '../../components/elements/MessageDND/MessageDND';
import ModalViewImage from '../../components/elements/ModalViewImage/ModalViewImage';
import { ApplicationStore, ModalViewImageStore, MessagesStore, MessageValue } from '../../types/store';
import './styles.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessage } from '../../redux/messages/messagesActions';
import { openModal, closeModal } from '../../redux/modalViewImage/modalViewImageActions';

interface HomeScreenProps {
	messagesStore: MessagesStore;
	modalViewImageStore: ModalViewImageStore;
	addMessage(Item: MessageValue): void;
	openModal(img: string): void;
	closeModal(): void;
}

const mapStateToProps = (state: ApplicationStore) => ({
	messagesStore: state.messagesStore,
	modalViewImageStore: state.modalViewImageStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	addMessage: bindActionCreators(addMessage, dispatch),
	openModal: bindActionCreators(openModal, dispatch),
	closeModal: bindActionCreators(closeModal, dispatch)
});

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): React.ReactElement {
		const { messagesStore, modalViewImageStore, addMessage, openModal, closeModal } = this.props;
		return (
			<>
				<div className="background">
					<header style={{ background: 'white', height: '50px' }}>Чат</header>
					<div className="container">
						<div className="content">
							<MessageList messages={messagesStore} openModal={openModal} />
							<MessageDND addMessage={addMessage} openModal={openModal} />
						</div>
					</div>
				</div>
				<ModalViewImage modalViewImageStore={modalViewImageStore} closeModal={closeModal}/>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);