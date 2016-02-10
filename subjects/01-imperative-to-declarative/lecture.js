import React from 'react';
import { render } from 'react-dom';
import { createTheremin } from './lib/Theremin';

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

class Tone extends React.Component {
  constructor(props) {
    super(props);
    this.theremin = createTheremin();
  }

  componentDidUpdate() {
    this.doImperativeWork();
  }

  doImperativeWork() {
    if (this.props.isPlaying) {
      this.theremin.play();
    } else {
      this.theremin.stop();
    }

    this.theremin.setPitchBend(this.props.pitch);
    this.theremin.setVolume(this.props.volume);
    this.theremin.setType(this.props.type);
  }

  render() {
    return null;
  }
}

class Theremin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      pitch: 0,
      volume: 0,
      type: this.props.type || 'sine'
    };
  }

  play = () => {
    this.setState({ isPlaying: true });
  }

  stop = () => {
    this.setState({ isPlaying: false });
  }

  changeTone = (event) => {
    let { clientX, clientY } = event;
    let { top, right, bottom, left } = event.target.getBoundingClientRect();
    let pitch = (clientX - left ) / 200;
    let volume = 1 - (clientY - top) / 200;
    this.setState({ pitch, volume });
  }

  render() {
    return (
        <div 
          style={styles.theremin}
          onMouseEnter={this.play}
          onMouseLeave={this.stop}
          onMouseMove={this.changeTone}
         >
          <Tone 
            pitch={this.state.pitch}
            volume={this.state.volume}
            type={this.state.type}
            isPlaying={this.state.isPlaying} />
         </div>
      );
  }
}

class App extends React.Component {
  render() {
    return (
    <div>
      <h1> What does it mean to be declarative? </h1>
      <Theremin />
      <Theremin type='triangle' />
      <Theremin type='square' />
      <Theremin type='sawtooth' />
    </div>)
  }
}

render(<App/>, document.getElementById('app'))
