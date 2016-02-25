import React from 'react';
import { fetchInitialTodos, loadMore } from '../lib/db';
import TodosBoard from './TodosBoard.js';
import TodoInput from './TodoInput.js';

export default class TodoApp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			newTodo: { content: '', struckThru: false },
			isLoading: true
		}
	}

	componentDidMount() {
		fetchInitialTodos(todos => this.setState({todos: todos, isLoading: false}));
	}

	onInput = (e) => {
		this.setState({ newTodo: {content: e.target.value }});
	}

	handleSave = () => {
		this.setState( 
			{ todos: [...this.state.todos, this.state.newTodo],
				newTodo: {content: ''}
			} 
			);
	}

	handleKeyDown = (e) => {
		if(e.key === 'Enter') {
			this.handleSave();
		} else if (e.key === 'Escape') {
			this.setState({ newTodo: {content: '' }});
		}
	}

		handleDelete = (i) => {
		this.setState({
			todos: [...this.state.todos.filter((todo, index) => index !== i )]
		});
	}

	handleStrikeThru = (i) => {
		this.setState({ 
			todos: [
			...this.state.todos.map((todo, index) => 
			(i === index ? 
				{content: todo.content, struckThru: !todo.struckThru} 
				: 
				todo)
			)] 
		});
	}

	handleEnter = () => {
		if (!this.state.isLoading) {
			let lastIndex = this.state.todos.length;
			loadMore(lastIndex, moreTodos => {
				this.setState({
					todos: [...this.state.todos, ...moreTodos],
					isLoading: false
				})
			})
		}
	}

	render() {
		return(
			<div>
				<TodosBoard
					handleEnter={this.handleEnter}
					isLoading={this.state.isLoading}
					todos={this.state.todos}
					user={this.props.user}
					handleStrikeThru={this.handleStrikeThru}
					handleDelete={this.handleDelete} />
				<TodoInput
					newTodo={this.state.newTodo}
					handleInput={this.onInput}
					handleSave={this.handleSave}
					handleKeyDown={this.handleKeyDown}
					/>
			</div>
			)
	}
}