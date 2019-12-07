import React from 'react';
import MessageList from '../../components/elements/MessageList/MessageList';
import MessageInput from '../../components/elements/MessageInput/MessageInput';
import { Item, ApplicationStore } from '../../types/store';

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
		const {messagesStore, addMessage } = this.props;
		return (
			<>
				<h3>Чат</h3>
				<MessageList messages={messagesStore} />
				<MessageInput addMessage={addMessage} />
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);