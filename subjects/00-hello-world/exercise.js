import React from 'react';
import { render } from 'react-dom';
import { fetchTodo } from './lib/db';
import styles from './main.css';
import { database } from './fakeBackend.js';
import axios from 'axios';

class ProductItem extends React.Component {
	render() {
		// ES6 short-hand for
		// var product = this.props.product;
		const { product, index } = this.props;
		return (
			<li key={index}> 
				<img src={product.image} width={100} /> 
				<h3>${product.price}</h3>
				<h4> {product.description} </h4>
				<button onClick={() => this.props.handleAddToCart(product)}> Add to Cart </button>
			</li>
		);
	}
}

class ShoppingCart extends React.Component {
	render() {
		const cartItems = this.props.cart.map(
			(item, i) => <li key={i}> {item.product} {item.price}</li>
		)

		const totalPrice = this.props.cart.map(item => item.price).reduce(
			((prev, next) => prev + next), 0
		).toFixed(2);

		return(
			<div>
	    	<h1> My Shopping Cart </h1>
	    	<ul>
	    		{cartItems}
	    	</ul>
	    	<h3>Total Price: {totalPrice} </h3>
	    </div>
		)
	}
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], cart: []};
    }

    componentDidMount() {
        axios.get('http://reactjs102.herokuapp.com/products')
            .then(response => this.setState({data: response.data}));
    }

    handleAddToCart = (product) => {
    	this.setState(
    		{ cart: [...this.state.cart, product] }
  		)
    }

    render() {

    	const productItems = this.state.data.map(
    		(product, i) => 
    			<ProductItem 
    				product={product} 
    				key={i} 
    				index={i} 
    				handleAddToCart={this.handleAddToCart} 
  				/>
			)
      return (
      		<div>
	          <ul>
	          	{productItems}
	          </ul>
	          <ShoppingCart cart={this.state.cart} />
          </div>
      );
    }
}

// class Header extends React.Component {
// 	render() {
// 		return (
// 			<h1>{this.props.header}</h1>
// 		);
// 	}
// }

// const Header = ({header}) => <h1>{header}</h1>;
// const Header = (props) => <h1>{props.header}</h1>;

// class TodoInput extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { 
// 			inputValue: ''
// 		};
// 	}

// 	handleInput = (event) => {
// 		this.setState({ inputValue: event.target.value });
// 	}

// 	handleKeyPress = (event) => {
// 		console.log(event.key);
// 		if (event.key === 'Enter') {
// 			this.props.handleSubmit();
// 		} else if (event.key === 'Escape') {
// 			this.setState({ inputValue: ''});
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<input 
// 					placeholder="Enter A New Todo"
// 					value={this.state.inputValue}
// 					onChange={this.handleInput}
// 					onKeyDown={this.handleKeyPress}
// 				/>
// 				<button onClick={() => this.props.handleSubmit(this.state.inputValue)}> Submit </button>
// 			</div>
// 		);
// 	}
// }

// class TodoItem extends React.Component {
// 	render() {
// 		const { item, index } = this.props;
// 		return(
// 			<li 
// 				key={index} 
// 				className={
// 					item.isComplete ? styles.todoItemComplete : styles.todoItem
// 			}>
// 				{item.todo}
// 				<button onClick={() => this.props.handleComplete(index)}>&#10003;</button>
// 				<button onClick={() => this.props.handleDelete(index)}>x</button>
// 			</li>
// 		);
// 	}
// }

// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { 
// 			inputValue: '', 
// 			todos: [],
// 			isLoaded: false, 
// 			displayCompleted: false,
// 			displayNotCompleted: false
// 		};
// 	}

// 	componentDidMount() {
// 		database(
// 			(todos) => {
// 				this.setState({todos: todos, isLoaded: true});
// 			}
// 		)
// 	}

// 	// todos: ['buy milk', 'buy coffee'];
// 	// todos: [ {todo: 'buy milk', isComplete: false }, { ...} ]
// 	handleInput = (event) => {
// 		this.setState({ inputValue: event.target.value });
// 	}


// 	handleSubmit = (value) => {
// 		this.setState(
// 			{ 
// 				todos: [...this.state.todos, 
// 					{todo: value, isComplete: false } ]
// 			}
// 		);
// 	}

// 	handleKeyPress = (event) => {
// 		console.log(event.key);
// 		if (event.key === 'Enter') {
// 			this.handleSubmit();
// 		} else if (event.key === 'Escape') {
// 			this.setState({ inputValue: ''});
// 		}
// 	}

// 	handleDelete = (i) => {
// 		this.setState({
// 			todos: this.state.todos.filter((todo, j) => i !== j )
// 		});
// 	}

// 	handleComplete = (i) => {
// 		this.setState({
// 			todos: this.state.todos.map((item, j) => i === j ? 
// 				{todo: item.todo, isComplete: !item.isComplete} : item)
// 		});
// 	}

// 	handleShowCompleted = () => {
// 		this.setState({ 
// 			displayCompleted: true,
// 			displayNotCompleted: false });
// 	}

// 	handleShowNotCompleted = () => {
// 		this.setState({ 
// 			displayCompleted: false,
// 			displayNotCompleted: true
// 		});
// 	}

// 	handleShowAll = () => {
// 		this.setState({
// 			displayCompleted: false,
// 			displayNotCompleted: false 
// 		})
// 	}

// 	handleClearCompleted = () => {
// 		this.setState({
// 			todos: this.state.todos.filter(item => !item.isComplete )
// 		});
// 	}

// 	render() {
// 		const boxStyle = {backgroundColor: 'pink', height: 300, width: 300, border: '2px solid black'};
// 		const todosItems = this.state.todos
// 		.map(item => this.state.displayCompleted ? (item.isComplete ? item : null) : item)
// 		.map(item => this.state.displayNotCompleted ? (item.isComplete ? null : item) : item)
// 		.map( 
// 			(item, i) => 
// 			(item && 
// 				<TodoItem 
// 					item={item}
// 					index={i}
// 					handleDelete={this.handleDelete} 
// 					handleComplete={this.handleComplete} />)
// 		);
// 		return (
// 			<div>
// 				<Header header="Hsin Todo App" />
// 				<TodoInput handleSubmit={this.handleSubmit} />
// 				<div style={boxStyle}>
// 					<ul>
// 						{this.state.isLoaded ? todosItems : 'Loading Todos...please wait'}
// 					</ul>
// 				</div>
// 				<button className={styles.allButton} onClick={this.handleShowAll}>All</button>
// 				<button className={styles.completeButton} onClick={this.handleShowCompleted}>Completed</button>
// 				<button onClick={this.handleShowNotCompleted}>Left to Do</button>
// 				<button onClick={this.handleClearCompleted}>Clear Completed</button>
// 			</div>
// 		);
// 	}
// }

render(<App />, document.getElementById('app'))
