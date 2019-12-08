import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screen/HomeScreen';

class App extends Component {
	render(): React.ReactElement {
		return (
			<Provider store={store}>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
				<HomeScreen />
			</Provider >
		);
	}
}

export default App;