import React from 'react';

export default class TodoInput extends React.Component{
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