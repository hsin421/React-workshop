// Partial Solution to To Do App

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			todos: [],
			newTodo: ''
		};
	}

	handleInput = (e) => {
		this.setState({newTodo: e.target.value});
	}

	handleSave = () => {
		this.setState({todos: [...this.state.todos, this.state.newTodo]});
	}

	render(){
		let todos = this.state.todos.map(todo => <p><span>x</span> {' ' + todo} </p>);
		return (
			<div>	
				<div>
					{todos}
				</div>
				<input onChange={this.handleInput} placeholder="Enter Todo" />
				<button onClick={this.handleSave} >Save Todo </button>
			</div>
			)
	}

}