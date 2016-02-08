import React from 'react'
import { render } from 'react-dom'

// class App extends React.Component {

//   render() {
//     return React.createElement('h1', {className: 'my-heading'}, 'hello world!!');
//   }

// }

const App = function() {
					//create element    type	   props                    children   
	return React.createElement('h1', {className: 'my-heading'}, 'hello world');
}

render(<App />, document.getElementById('app'))
