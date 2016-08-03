import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './App.css';
import TodoList from './Todo';

const LeftPanel = props => (
  <div className="panel left" style={props.style}>
    <h4>Left</h4>
  </div>
);

const MiddlePanel = props => (
  <div className="panel middle" style={props.style}>
    <h4>Middle</h4>
    <button onClick={() => props.onClick('left')}>
      Toggle left panel
    </button>
    <button onClick={() => props.onClick('right')}>
      Toggle right panel
    </button>
  </div>
);

const RightPanel = props => (
  <div className="panel right" style={props.style}>
    <h4>Right</h4>
    <button onClick={() => props.onClick('right')}>
      Close right panel
    </button>
  </div>
);


class App extends Component {
  constructor(props) {
    super(props);

    // set the initial state
    this.state = {
      left: true,
      middle: true,
      right: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    const { left, middle, right } = this.state;
    console.log('this.state', this.state);

    return (
      <div className="App">

        <Motion style={{x: spring(this.state.left ? 0 : -400)}}>
          {({x}) =>
            <div>
              {left && <LeftPanel style={{ left: x }} onClick={this.handleClick} />}
              {middle && <MiddlePanel style={{ left: x }} onClick={this.handleClick} />}
              {right && <RightPanel style={{ left: x }} onClick={this.handleClick} />}
            </div>
          }

        </Motion>

      </div>
    );
  }
}

export default App;
