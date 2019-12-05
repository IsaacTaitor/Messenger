import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screen/HomeScreen';

class App extends Component {
	render(): React.ReactElement {
		return (
			<Provider store={store}>
				<HomeScreen />
			</Provider >
		);
	}
}

export default App;