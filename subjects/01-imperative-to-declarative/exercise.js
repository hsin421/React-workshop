////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
//
// Hint: Modal shouldn't need its own state anymore.
////////////////////////////////////////////////////////////////////////////////
import $ from 'jquery'
import 'bootstrap-webpack'
import React from 'react'
import { render, findDOMNode } from 'react-dom'

class Modal extends React.Component {
  render () {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      selectedData: null
    }
  }

  toggleDropdown = () => {
    this.setState({
      isShowing: !this.state.isShowing
    })
  }

  selectData = (data) => {
    this.setState({
      selectedData: data,
      isShowing: false
    });
  } 
  render() {
    const dataArray = this.props.data.map(
      data => <li onClick={() => this.selectData(data)}> {data} </li>
    );

    return (
      <div>
        <div onClick={this.toggleDropdown}>
          {this.props.title} 
          {this.state.selectedData && `: ${this.state.selectedData}`}
        </div>
        { this.state.isShowing && 
          <ul>
           {dataArray}
          </ul>
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  title: React.PropTypes.string.isRequired,
  data: React.PropTypes.array
}

class App extends React.Component {
  render () {
    const guestNumberArray = ['beef', 'sushi','burrito'];
    return (
        <Dropdown 
          title="What would you like for dinner?"
          data={guestNumberArray} />
          
    );
  }
}

render(<App/>, document.getElementById('app'))