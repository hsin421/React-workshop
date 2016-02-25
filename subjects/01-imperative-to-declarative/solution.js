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
  constructor(props) {
    super(props)
    this.doImperativeWork = this.doImperativeWork.bind(this);
  }

  componentDidMount () {
    this.doImperativeWork()
  }

  componentDidUpdate () {
    this.doImperativeWork()
  }

  doImperativeWork() {
    var $el = $(findDOMNode(this))
    if (this.props.isOpen === true)
      $el.modal('show')
    else
      $el.modal('hide')
  }

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {modalIsOpen: false};
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

        <Modal isOpen={this.state.modalIsOpen} title="Declarative is better">
          <p>Calling methods on instances is a Imperative not a Declarative!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

      </div>
    );
  }
};

render(<App/>, document.getElementById('app'))

