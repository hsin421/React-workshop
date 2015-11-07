import React from 'react'
import { render } from 'react-dom'
import { createTheremin } from './lib/Theremin'

let styles = {}

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: '1px solid',
  cursor: 'crosshair',
  margin: 10,
  display: 'inline-block'
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1> What does it mean to be declarative? </h1>
      </div>
      );
  }
}

render(<App/>, document.getElementById('app'))
