import React from 'react';
import { render } from 'react-dom';
import { fetchTodo } from './lib/db';


const App = () =>  React.createElement('h1', {className: 'my-heading'}, 'Hello world');

render(<App />, document.getElementById('app'))
