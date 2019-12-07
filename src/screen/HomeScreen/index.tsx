import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageInput from '../../components/elements/MessageInput/MessageInput';
import { Item, ApplicationStore } from '../../types/store';
import './styles.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessage } from '../../redux/messages/messagesActions';

interface HomeScreenProps {
	messagesStore: Array<Item>;
	addMessage(Item: Item): void;
}

const mapStateToProps = (state: ApplicationStore): any => ({
	messagesStore: state.messagesStore,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): any => ({
	addMessage: bindActionCreators(addMessage, dispatch)
});

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): any {
		const { messagesStore, addMessage } = this.props;
		return (
			<div style={{ position: 'fixed', top: 0, left: 0,	width: '100%', height: '100%', background: '#e9e9e9'}}>
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