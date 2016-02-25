import React from 'react';
import Waypoint from 'react-waypoint';
import TodoItem from './TodoItem.js';

export default class TodosBoard extends React.Component{

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
						{this.props.isLoading || <p> Loading more todos </p>}
						<Waypoint onEnter={this.props.handleEnter} />
					</div>
				</div>
			</div>
			)
	}
}

TodosBoard.propTypes = {
	user: React.PropTypes.string,
	isLoading: React.PropTypes.bool
}
