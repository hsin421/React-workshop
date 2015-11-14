import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store.js'
import { connect } from 'react-redux'
// import { incrementRedux, decrementRedux } from './actions.js'

const styles = {
  div: {fontSize: '30px', paddingLeft: '40px', marginTop: '50px'},
  span: {paddingLeft: '30px', fontWeight: 'bold', cursor: 'pointer'}
};

const store = configureStore();

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.div}>
        <h3> I am counter #{this.props.id} </h3>
        <span  style={styles.span} onClick={this.props.increment}> + </span> 
        <span style={styles.span}> {this.props.number} </span> 
        <span style={styles.span} onClick={this.props.decrement}> - </span>
      </div>
      )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  increment = () => {

  }

  decrement = () => {

  }

  render() {
    return (
      <div>
        <h1> What the redux? </h1>
        <Counter id="1" number={this.props.counter} increment={this.increment} decrement={this.decrement} />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

let ReduxApp = connect(mapStateToProps)(App);

render(
  <Provider store={store}> 
   <ReduxApp /> 
  </Provider>, document.getElementById('app'));
// require('./createDevToolWindow.js')(store);

