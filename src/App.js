import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import './App.css';

const LeftPanel = props => (
  <div key="left" className="panel left" style={props.style}>
    <h4>Left</h4>
  </div>
);

const MiddlePanel = props => (
  <div key="middle" className="panel middle" style={props.style}>
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
  <div key="right" className="panel right" style={props.style}>
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
      panels: [{ key: 'left', }, { key: 'middle', }, { key: 'right', }],
      offset: -400,
      left: true,
      middle: true,
      right: true,
    };


    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      [key]: !this.state[key],
      panels: [{ key: 'middle', }, { key: 'right', }],
    });
  }

  willLeave() {
    return { left: spring(0) };
  }

  render() {
    const { left, middle, right } = this.state;
    console.log('this.state', this.state);

    return (
      <div className="App">

        <TransitionMotion
          willLeave={this.willLeave}
          styles={this.state.panels.map(panel => ({
            key: panel.key,
            style: { left: this.state.offset },
          }))}
        >
          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map(config => {
                if (config.key === 'left') return <LeftPanel style={{ left: config.style.left }} onClick={this.handleClick} />;
                else if (config.key === 'middle') return <MiddlePanel style={{ left: config.style.left }} onClick={this.handleClick} />;
                else if (config.key === 'right') return <RightPanel style={{ left: config.style.left }} onClick={this.handleClick} />;
              })}
            </div>
          }

        </TransitionMotion>

      </div>
    );
  }
}

export default App;
