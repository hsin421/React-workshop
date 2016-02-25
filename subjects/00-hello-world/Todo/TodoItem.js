import React from 'react';
import styles from '../styles/main.css';

export default class TodoItem extends React.Component{
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

TodoItem.propTypes = {
	handleStrikeThru: React.PropTypes.func,
	handleDelete: React.PropTypes.func,
	index: React.PropTypes.number,
	todo: React.PropTypes.object
}
