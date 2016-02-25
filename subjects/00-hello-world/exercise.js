import React from 'react';
import { render } from 'react-dom';
import TodoApp from './Todo/TodoApp.js';

class App extends React.Component{
	render() {
		return(
			<TodoApp user="Mike" />
			)
	}
}



render(<App />, document.getElementById('app'))
