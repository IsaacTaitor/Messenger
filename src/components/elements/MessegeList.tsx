import React from 'react';
import { Item } from '../../redux/messages/messagesReducers';

export default class MessegeList extends React.PureComponent<{ messages: Array<Item> }> {
	render(): any {
		debugger;
		return (
			<div style={{ width: 200, height: 300, borderWidth: 1, borderColor: 'black', display: 'flex', flexDirection: 'column-reverse', backgroundColor: 'powderblue', overflow: 'auto', flexWrap: 'nowrap' }}>
				{this.props.messages.map(item => (
					<div style={{ minHeight: 30, backgroundColor: 'lightblue' }} key={item.id}>
						<div style={{ width: '100%', height: '100%' }}>{item.text}</div>
					</div>
				))}
			</div>
		);
	}
}