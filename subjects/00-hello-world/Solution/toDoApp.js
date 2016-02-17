// Partial Solution to To Do App

// class App extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			todos: [],
// 			newTodo: ''
// 		};
// 	}

// 	handleInput = (e) => {
// 		this.setState({newTodo: e.target.value});
// 	}

// 	handleSave = () => {
// 		this.setState({todos: [...this.state.todos, this.state.newTodo]});
// 	}

// 	render(){
// 		let todos = this.state.todos.map(todo => <p><span>x</span> {' ' + todo} </p>);
// 		return (
// 			<div>	
// 				<div>
// 					{todos}
// 				</div>
// 				<input onChange={this.handleInput} placeholder="Enter Todo" />
// 				<button onClick={this.handleSave} >Save Todo </button>
// 			</div>
// 			)
// 	}

// }

//************** More complete partial solution to To Do App
/////////////////////////////////////////


// class App extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			todos: [],
// 			newTodo: '',
// 			isLoading: true
// 		};
// 	}

// 	componentDidMount() {
// 		fetchTodo(todos => this.setState({todos: todos, isLoading: false}));
// 	}

// 	handleInput = (e) => {
// 		this.setState({newTodo: e.target.value});
// 	}

// 	handleSave = () => {
// 		this.setState(
// 			{
// 				todos: [...this.state.todos, this.state.newTodo],
// 				newTodo: ''
// 			}
// 			);
// 	}

// 	handleEnter = (e) => {
// 		// console.log(e.key);
// 		if (e.key === 'Enter') {
// 			this.setState(
// 				{
// 					todos: [...this.state.todos, this.state.newTodo],
// 					newTodo: ''
// 				});
// 		} else if (e.key === 'Escape') {
// 			this.setState({newTodo: ''});
// 		}
// 	}

// 	render(){
// 		let todos = this.state.todos.map((todo, i) => 
// 			<p key={todo}> 
// 				{i + 1 + '. ' + todo} 
// 				<span style={{float: 'right', opacity: '0.5'}}>X</span>
// 			</p>
// 			);
// 		return (
// 			<div>
// 				<h2>Hsin's To Do List </h2>
// 				<div style={{height: '300', width: '200', border: '2px solid blue'}}>
// 					{this.state.isLoading ? 'Loading data, please wait...' : todos}
// 				</div>
// 				<input onChange={this.handleInput} placeholder="Enter Todo" onKeyDown={this.handleEnter} value={this.state.newTodo} />
// 				<button onClick={this.handleSave} >Save Todo </button>
// 			</div>
// 			)
// 	}
// }

// *********** Componentized To Do App
///////////////////////////////////////

// class TodoItem extends React.Component {
// 	render() {
// 		return (
// 			<p> 
// 				{this.props.index + 1 + '. ' + this.props.todo} 
// 				<span style={{float: 'right', opacity: '0.5'}}>X</span>
// 			</p>
// 			);
// 	}
// }

// class Todos extends React.Component {
// 	render() {
// 		let todos = this.props.todos.map((todo, i) => 
// 			<TodoItem key={i} index={i} todo={todo} />
// 			);
// 		return (
// 			<div>
// 				<h2>Hsin's To Do List </h2>
// 				<div style={{height: '300', width: '200', border: '2px solid blue'}}>
// 					{todos}
// 				</div>
// 			</div>
// 			)
// 	}
// }

// class TodoInput extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<input onChange={this.props.handleInput} placeholder="Enter Todo" onKeyDown={this.props.handleEnter} value={this.props.newTodo} />
// 				<button onClick={this.props.handleSave} >Save Todo </button>
// 			</div>
// 			)
// 	}
// }


// class App extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			todos: [],
// 			newTodo: ''
// 		};
// 	}

// 	onInput = (e) => {
// 		this.setState({newTodo: e.target.value});
// 	}

// 	onSave = () => {
// 		this.setState(
// 			{
// 				todos: [...this.state.todos, this.state.newTodo],
// 				newTodo: ''
// 			}
// 			);
// 	}

// 	onEnter = (e) => {
// 		// console.log(e.key);
// 		if (e.key === 'Enter') {
// 			this.setState(
// 				{
// 					todos: [...this.state.todos, this.state.newTodo],
// 					newTodo: ''
// 				});
// 		} else if (e.key === 'Escape') {
// 			this.setState({newTodo: ''});
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Todos todos={this.state.todos} />
// 				<TodoInput 
// 					newTodo={this.state.newTodo} 
// 					handleInput={this.onInput}
// 					handleSave={this.onSave}
// 					handleEnter={this.onEnter} />
// 			</div>
// 			)
// 	}
// }