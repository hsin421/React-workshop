class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			cardNumber: '',
			expMonth: null,
			expYear: null,
			cardNumberError: null
		};
		this.handleInputMonth = this.handleInputMonth.bind(this);
		this.handleInputYear = this.handleInputYear.bind(this);

	}

	handleInputNumber = (e) => {
		this.setState({cardNumber: e.target.value});
	}

	handleInputMonth(e) {
		this.setState({expMonth: e.target.value});
	}

	handleInputYear = function(e) {
		this.setState({expYear: e.target.value});
	}

	validate = (e) => {
		if (e.target.value.length < 14) {
			this.setState({cardNumberError: 'Card number must be more than 14 digits'})
		} else if (e.target.value.length > 16) {
			this.setState({cardNumberError: 'Card number must be less than 17 digits'})
		} else if (parseInt(e.target.value) % 1 !== 0) {
			this.setState({cardNumberError: 'Card number must consist of integers'})
		}
	}

  render() {
    return (
    	<div>
	    	<h1> Show me the money </h1>
	    	<pre> {JSON.stringify(this.state)} </pre>
	    	<label> Card Number </label>
	    	<input type="text" placeholder="credit card number" onChange={this.handleInputNumber} value={this.state.cardNumber} onBlur={this.validate} />
	    	<label> Expiration </label>
	    	<input type="number" placeholder="month" onChange={this.handleInputMonth} value={this.state.expMonth} />
	    	<input type="number" placeholder="year" onChange={this.handleInputYear} value={this.state.expYear} />
	    	<p style={{color: 'red'}}> {this.state.cardNumberError} </p>
    	</div>
    	)
  }

}