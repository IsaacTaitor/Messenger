import React from 'react';
import MessegeList from '../../components/elements/MessegeList';
import MessegeInput from '../../components/elements/MessegeInput';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { addMessege } from '../../redux/messages/messagesActions';
import { Item } from '../../redux/messages/messagesReducers';

interface HomeScreenProps {
	messagesStore: Array<Item>;
	addMessege(Item: Item): void;
}

const mapStateToProps = (state: any): any => ({
	messagesStore: state.messagesStore,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): any => {
	return {
		addMessege: bindActionCreators(addMessege, dispatch)
	};
};

class HomeScreen extends React.Component<HomeScreenProps> {

	render(): any {
		return (
			<div>
				<h3>Чат</h3>
				<MessegeList messages={this.props.messagesStore} />
				<MessegeInput addMessege={this.props.addMessege} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);