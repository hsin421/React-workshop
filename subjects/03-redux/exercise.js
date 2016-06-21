import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store.js'
import { connect } from 'react-redux'
import { 
  incrementRedux, 
  decrementRedux, 
  inputTyping, 
  handleSubmit,
  handleDelete,
  requestTodosRedux } from './actions.js';

import { requestTodos } from './fakeDb';

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

  componentDidMount() {
    requestTodos((todos) => {
      this.props.dispatch(requestTodosRedux(todos))
      // console.log(todos);
    });
  }

  increment = (index) => {
    this.props.dispatch(incrementRedux(index));
  }

  decrement = (index) => {
    this.props.dispatch(decrementRedux(index));
  }

  handleInput = (e) => {
    this.props.dispatch(inputTyping(e.target.value));
  }

  handleSubmit = () => {
    this.props.dispatch(handleSubmit(this.props.todos.inputValue))
  }

  handleDelete = (index) => {
    this.props.dispatch(handleDelete(index));
  }

  render() {
    const todos = this.props.todos.todos.map(
      (todo, index) => 
        <p key={todo}> 
          {todo} 
          <button onClick={() => this.handleDelete(index)}>x</button>
        </p>
    )
    const counters = this.props.counters.map(
      (counter, index) => 
        <Counter 
          key={index}
          id={index} 
          number={counter.count} 
          increment={() => this.increment(index)} 
          decrement={() => this.decrement(index)} />
    );   
    return (
      <div>
        <h1> What the redux? </h1>
        <input onChange={this.handleInput} value={this.props.todos.inputValue} />
        <button onClick={this.handleSubmit} > Submit </button>
        {this.props.todos.isLoaded ? todos : <p>Loading...</p> }
        { counters }
      </div>
      );
  }
}
// state is Redux state / return props for our component
const mapStateToProps = (state) => {
  return {
    counters: state.counters,
    todos: state.todos
  }
}
// functional programming: higher order components (functions)
let ReduxApp = connect(mapStateToProps)(App);

render(
  <Provider store={store}> 
   <ReduxApp counter={10} /> 
  </Provider>, document.getElementById('app'));
require('./createDevToolWindow.js')(store);


// ***** cheatsheet

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   }
// }

// let ReduxApp = connect(mapStateToProps)(App);

