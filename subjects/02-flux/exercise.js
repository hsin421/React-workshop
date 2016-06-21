import React from 'react'
import { render } from 'react-dom'
import AltStore from './store.js';
import AltAction from './actions.js';

const styles = {
  div: {fontSize: '30px', paddingLeft: '40px', marginTop: '50px'},
  span: {paddingLeft: '30px', fontWeight: 'bold', cursor: 'pointer'}
};


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = AltStore.getState(); 
  }

  componentDidMount() {
    AltStore.listen(this._onChange);
  }

  componentWillUnmount() {
    AltStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      todoState: AltStore.getState().todoState
    });
  }

  handleInput = (e) => {
    AltAction.input(e.target.value);
  }

  handleSubmit = () => {
    AltAction.todosubmit(this.state.todoState.inputValue);
  }

  render() {
    const todos = this.state.todoState.todos.map(
      (todo, index) => <p key={index}> {todo} </p>
    );
    return (
      <div style={styles.div}>
        <pre>{JSON.stringify(this.state)}</pre>
        <input 
          onChange={this.handleInput} 
          value={this.state.todoState.inputValue} />
        <button onClick={this.handleSubmit}>Submit</button>
        {todos}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1> What the flux? </h1>
        <Todo />
      </div>
      );
  }
}

render(<App/>, document.getElementById('app'));

/*
- Flux is an architecture, not a framework
  - DO NOT START BUILDING STUFF WITH FLUX WHEN YOU'RE FIRST GETTING STARTED WITH REACT
  - It can be difficult to understand why the patterns in Flux are useful if you haven't
    already tried to solve problems w/out Flux
  - You'll most likely hate Flux unless you're already fighting with your current JS
    framework. If you're not, stick with what's working for you
- Flux is good at:
  - Making it easy to reason about changes to state
- It answers 2 questions:
  - What state is there?
  - When does it change?
Open Flux.png
- Views
  - React components (see components)
  - Create actions (see actions/ViewActionCreators.js)
- Action Creators
  - Create "actions" with meaningful names (e.g. "load contacts", "delete contact").
    These are the verbs. Ask yourself, "what actions can the user take?"
  - Send actions through the dispatcher
  - Possibly trigger API requests (side effect)
- Dispatcher
  - The only actual code Facebook's flux repo gives you!
  - Synchronous dispatch of actions to ALL registered listeners (stores)
  - Ensures only one action happens at a time
- Stores
  - Store the state of your app
  - Listen for actions from the dispatcher, so they know when to update state
  - Notify listeners when the state changes
*/

//*********

// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: 0
//     };
//   }

//   increment = () => {
//     this.setState({number: this.state.number + 1});
//   }

//   decrement = () => {
//     this.setState({number: this.state.number - 1});
//   }

//   render() {
//     return (
//       <div style={styles.div}>
//         <h3> I am counter #{this.props.id} </h3>
//         <span  style={styles.span} onClick={this.increment}> + </span> 
//         <span style={styles.span}> {this.state.number} </span> 
//         <span style={styles.span} onClick={this.decrement}> - </span>
//       </div>
//       )
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//   }

//   render() {
//     return (
//       <div>
//         <h1> What the flux? </h1>
//         <Counter id="1"/>
//         <Counter id="2"/>
//         <Counter id="3"/>
//       </div>
//       );
//   }
// }

// *************

// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div style={styles.div}>
//         <h3> I am counter #{this.props.id} </h3>
//         <span  style={styles.span} onClick={this.props.increment}> + </span> 
//         <span style={styles.span}> {this.props.number} </span> 
//         <span style={styles.span} onClick={this.props.decrement}> - </span>
//       </div>
//       )
//   }
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = AltStore.getState();
//   }

//   componentDidMount() {
//     AltStore.listen(this._onChange);
//   }

//   componentWillUnmount() {
//     AltStore.unlisten(this._onChange);
//   }

//   _onChange = () => {
//     this.setState({
//       counter: AltStore.getState().counter
//     });
//   }

//   increment = () => {
//     AltAction.increment();
//   }

//   decrement = () => {
//     AltAction.decrement();
//   }

//   render() {
//     const { counter } = this.state;
//     return (
//       <div>
//         <h1> What the flux? </h1>
//         <Counter number={counter} increment={this.increment} decrement={this.decrement} />
//       </div>
//       );
//   }
// }

// render(<App/>, document.getElementById('app'));
