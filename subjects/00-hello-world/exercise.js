import React from 'react';
import { render } from 'react-dom';
import Waypoint from 'react-waypoint';
import { fetchTodo, fetchInitialTodos, loadMore } from './lib/db';

// class App extends React.Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			todos: [],
// 			newTodo: { content: '', struckThru: false }
// 		}
// 	}

// 	handleInput = (e) => {
// 		this.setState({ newTodo: {content: e.target.value }});
// 	}

// 	handleSave = () => {
// 		this.setState( 
// 			{ todos: [...this.state.todos, this.state.newTodo],
// 				newTodo: {content: ''}
// 			} 
// 			);
// 	}

// 	handleKeyDown = (e) => {
// 		if(e.key === 'Enter') {
// 			this.handleSave();
// 		} else if (e.key === 'Escape') {
// 			this.setState({ newTodo: {content: '' }});
// 		}
// 	}

// 	handleDelete = (i) => {
// 		this.setState({
// 			todos: [...this.state.todos.filter((todo, index) => index !== i )]
// 		});
// 	}

// 	handleStrikeThru = (i) => {
// 		this.setState({ 
// 			todos: [
// 			...this.state.todos.map((todo, index) => 
// 			(i === index ? 
// 				{content: todo.content, struckThru: !todo.struckThru} 
// 				: 
// 				todo)
// 			)] 
// 		});
// 	}

// 	//{textDecoration: 'line-through'}

// 	render() {
// 		let todos = this.state.todos.map((todo, i) => (
// 			<span>
// 				<p 
// 					key={i} 
// 					onClick={() => this.handleStrikeThru(i)} 
// 					style={todo.struckThru ? {textDecoration: 'line-through'} : null}> 
// 					{i + 1 + '. ' + todo.content} 
// 					</p>
// 					<button 
// 						style={{float: 'right'}}
// 						onClick={() => this.handleDelete(i)} > 
// 						x 
// 					</button> 
// 				</span>
// 			));
// 		return(
// 			<div>
// 				<h2>Hsin's To Do App </h2>
// 				<div style={{height: '200', width: '200', border: '2px solid blue'}}>
// 					{todos}
// 				</div>
// 				<input 
// 					onChange={this.handleInput}
// 					onKeyDown={this.handleKeyDown}
// 					value={this.state.newTodo.content} />
// 				<button onClick={this.handleSave} > Save Todo </button>
// 			</div>
// 			)
// 	}
// }

class TodoInput extends React.Component{
	render() {
		return (
			<div>
				<input 
					onChange={this.props.handleInput}
					onKeyDown={this.props.handleKeyDown}
					value={this.props.newTodo.content} />
				<button onClick={this.props.handleSave} > Save Todo </button>
			</div>
			)
	}

}

class TodoItem extends React.Component{
	render(){
		let { index, todo } = this.props;
		return(
			<div>
				<span 
					key={index} 
					onClick={() => this.props.handleStrikeThru(index)} 
					style={todo.struckThru ? {textDecoration: 'line-through'} : null}> 
					{index + 1 + '. ' + todo.content} 
					</span>
					<span 
						style={{float: 'right'}}
						onClick={() => this.props.handleDelete(index)} > 
						x 
					</span> 
			</div>
			)
	}
}

class TodosBoard extends React.Component{

	render(){
		let todos = this.props.todos.map((todo, i) => (
			<TodoItem key={i} index={i} todo={todo} handleStrikeThru={this.props.handleStrikeThru} handleDelete={this.props.handleDelete} />
			));
		return (
			<div>
				<h2>{this.props.user + 's To Do App'} </h2>
				<div style={{height: '200', width: '200', border: '2px solid blue', overflow: 'scroll', position: 'relative'}}>
					{this.props.isLoading ? 'Loading data...' : todos}
					<div>
						{this.props.isLoading || <p> Loading more todos... </p>}
						<Waypoint onEnter={this.props.handleLoadMore} />
					</div>
				</div>
			</div>
			)
	}
}

class TodoApp extends React.Component{
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

	handleLoadMore = (todos) => {
		if (!this.state.isLoading) {
			console.log('Enter!');
			const lastIndex = this.state.todos.length;
			console.log('last index ' + lastIndex);
			loadMore(lastIndex, moreTodos => this.setState(
				{
					todos: this.state.todos.concat(moreTodos), 
					isLoading: false
				}
			));
		}
	}

	render() {
		return(
			<div>
				<TodosBoard
					isLoading={this.state.isLoading}
					todos={this.state.todos}
					user={this.props.user}
					handleStrikeThru={this.handleStrikeThru}
					handleDelete={this.handleDelete}
					handleLoadMore={this.handleLoadMore} />
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


class App extends React.Component{
	render() {
		return(
			<TodoApp user="Mike" />
			)
	}
}



render(<App />, document.getElementById('app'))
