import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageInput from '../../components/elements/MessageInput/MessageInput';
import { MessagesStore, ApplicationStore, MessageValue } from '../../types/store';
import './styles.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessage } from '../../redux/messages/messagesActions';

interface HomeScreenProps {
	messagesStore: MessagesStore;
	addMessage(Item: MessageValue): void;
}

const mapStateToProps = (state: ApplicationStore) => ({
	messagesStore: state.messagesStore,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
	addMessage: bindActionCreators(addMessage, dispatch)
});

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): any {
		const { messagesStore, addMessage } = this.props;
		return (
			<div className="background">
				<header style={{background: 'white', height: '50px' }}>Чат</header>
				<div className="container">
					<div className="content">
						<MessageList messages={messagesStore} />
						<MessageInput addMessage={addMessage} />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);