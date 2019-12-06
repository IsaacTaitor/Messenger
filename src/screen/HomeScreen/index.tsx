import React from 'react';

interface Item { id: number; text: string }

class HomeScreen extends React.Component<{}, { items: Array<Item>; text: string }> {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
	}

	render(): any {
		return (
			<div>
				<h3>Чат</h3>
				<MessegeList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<input
						id="new-messege"
						onChange={this.handleChange}
						value={this.state.text}
					/>
				</form>
			</div>
		);
	}

	handleChange = (e): void => {
		this.setState({ text: e.target.value });
	}

	handleSubmit = (e): void => {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem: Item = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(prevState => ({
			items: [newItem].concat(...prevState.items),
			text: ''
		}));
	}
}

class MessegeList extends React.Component<{ items: Array<{ id: number; text: string }> }> {
	render(): any {
		return (
			<div style={{ width: 200, height: 300, borderWidth: 1, borderColor: 'black', display: 'flex', flexDirection: 'column-reverse', backgroundColor: 'powderblue', overflow: 'scroll', flexWrap: 'nowrap' }}>
				{this.props.items.map(item => (
					<div style={{ minHeight: 30, backgroundColor: 'lightblue' }} key={item.id}>
						<div style={{ width: '100%', height: '100%' }}>{item.text}</div>
					</div>
				))}
			</div>
		);
	}
}

export default HomeScreen;