import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import './App.css';

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
      panels: [{
        key: 'left',
        component: LeftPanel,
      }, {
        key: 'middle',
        component: MiddlePanel,
      }, {
        key: 'right',
        component: RightPanel,
      }],
      offset: 0,
      left: true,
      middle: true,
      right: true,
    };


    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      [key]: !this.state[key],
      panels: [{
        key: 'middle',
        component: MiddlePanel,
      }, {
        key: 'right',
        component: RightPanel,
      }],
    });
  }

  willLeave() {
    return { left: spring(-400) };
  }

  render() {
    console.log('this.state', this.state);

    return (
      <div className="App">

        <TransitionMotion
          willLeave={this.willLeave}
          styles={this.state.panels.map(({ key, component }) => {
            return ({
              key,
              data: { component },
              style: { left: this.state.offset },
            })
          })}>

          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map((config, i, arr) => {
                return (
                  <config.data.component
                    key={config.key}
                    style={{ left: arr[0].style.left }}
                    onClick={this.handleClick}
                  />
                  );
              })}
            </div>
          }

        </TransitionMotion>

      </div>
    );
  }
}

export default App;
