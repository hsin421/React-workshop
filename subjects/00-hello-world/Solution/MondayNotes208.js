// class ControlledInput extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { inputValue: '', headingColor: '' };
// 		// this.handleInput = this.handleInput.bind(this);
// 	}

// 	handleInput = (e) => {
// 		this.setState({inputValue: e.target.value});
// 	}

// 	handleClick = () => {
// 		this.setState({headingColor: this.state.inputValue});
// 	}

// 	handleHover = () => {
// 		this.setState({headingColor: 'green'});
// 	}

//   render() {
//     return (
//     	<div>
// 	    	<h1 style={{color: this.state.headingColor}}> {'Hello ' + (this.props.title || 'world')} </h1>
// 	    	<pre> {JSON.stringify(this.state)} </pre>
// 	    	<input style={{borderColor: 'black'}} onChange={this.handleInput} value={this.state.inputValue} />
//     		<button onClick={this.handleClick} onMouseEnter={this.handleHover}> Click me </button>
//     	</div>
//     	);
//   }

// }

// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			cardNumber: '',
// 			expMonth: null,
// 			errorMsg: null
// 		}
// 	}

// 	componentWillMount() {
// 		console.log('mounting');
// 	}

// 	componentDidMount() {
// 		console.log('mounted');
// 	}

// 	handleInputNumber = (e) => {
// 		this.setState({cardNumber: e.target.value});
// 	}

// 	handleInputExpMonth = (e) => {
// 		this.setState({expMonth: e.target.value});
// 	}

// 	validate = () => {
// 		if (this.state.cardNumber.length < 14) {
// 			this.setState({errorMsg: 'Card number has to be more than 14 digits'})
// 		} else if (this.state.cardNumber.length > 16) {
// 			this.setState({errorMsg: 'Card number has to be less than 16 digits'})
// 		} else if (parseInt(this.state.cardNumber) % 1 === 0) {
// 			this.setState({errorMsg: 'Card number has to consist of integers'})
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1> Show me the money </h1>
// 				<pre> {JSON.stringify(this.state)} </pre>
// 				<label>Card Number </label>
// 				<input onChange={this.handleInputNumber} onBlur={this.validate} />
// 				<label>Expiration Month </label>
// 				<input onChange={this.handleInputExpMonth} />
// 				<p style={{color: 'red'}}> {this.state.errorMsg} </p>
// 			</div>
// 			);
// 	}



// }

// class Dropdown extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { display: false }
// 	}

// 	handleDropdown = () => {
// 		this.setState({display: !this.state.display});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<p onClick={this.handleDropdown}> Dropdown </p>
// 				{this.state.display && this.props.children}
// 			</div>
// 			)
// 	}
// }

// class App extends React.Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {value: 0};
// 	}

// 	handleDecrease = () => {
// 		this.setState({value: this.state.value - 1});
// 	}

// 	render() {
// 		return (
// 			<div>
// 			<span onClick={this.handleDecrease} > - </span> <span> {this.state.value} </span> <span> + </span>
// 			</div>
// 			)
// 	}
// }

// class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			data: [
// 			{name: 'Tab1', content: 'Cat'}, 
// 			{name: 'Tab2', content: 'Dog'},
// 			{name: 'Tab3', content: 'Tiger'}
// 			],
// 			selected: 0
// 		}
// 	}

// 	handleClick = (i) => {
// 		this.setState({selected: i});
// 		// change the route
// 	}

// 	render() {
// 		let tabs = this.state.data.map((e, i) => (
// 			<span 
// 				onClick={() => this.handleClick(i)} 
// 				style={this.state.selected === i ? {borderBottom: '1px solid black'} : null}> {e.name} </span>
// 			));
// 		return (
// 			<div>
// 				{tabs}
// 				<div>
// 					I am a {this.state.data[this.state.selected].content}
// 				</div>
// 			</div>
// 			)
// 	}
// }


// const App = React.createClass({
// 	render() {
// 		reutrn 
// 	}
// })

// const App = () =>  React.createElement('h1', {className: 'my-heading'}, 'Hello world');