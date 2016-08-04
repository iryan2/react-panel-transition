import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import _ from 'lodash';
import './App.css';

const LeftPanel = props => (
  <div className="panel left" style={props.style}>
    <h4>Left</h4>
    <button onClick={() => props.onClick('left')}>
      Toggle left panel
    </button>
    <button onClick={() => props.onClick('middle')}>
      Toggle middle panel
    </button>
    <button onClick={() => props.onClick('right')}>
      Toggle right panel
    </button>
  </div>
);

const MiddlePanel = props => (
  <div className="panel middle" style={props.style}>
    <h4>Middle</h4>
    <button onClick={() => props.onClick('left')}>
      Toggle left panel
    </button>
    <button onClick={() => props.onClick('middle')}>
      Toggle middle panel
    </button>
    <button onClick={() => props.onClick('right')}>
      Toggle right panel
    </button>
  </div>
);

const RightPanel = props => (
  <div className="panel right" style={props.style}>
    <h4>Right</h4>
    <button onClick={() => props.onClick('left')}>
      Toggle left panel
    </button>
    <button onClick={() => props.onClick('middle')}>
      Toggle middle panel
    </button>
    <button onClick={() => props.onClick('right')}>
      Toggle right panel
    </button>
  </div>
);

const panelConfig = [{
  key: 'left',
  component: LeftPanel,
}, {
  key: 'middle',
  component: MiddlePanel,
}, {
  key: 'right',
  component: RightPanel,
}];

class App extends Component {
  constructor(props) {
    super(props);

    // set the initial state
    this.state = {
      panels: panelConfig,
      offset: 0,
      left: true,
      middle: true,
      right: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    const { panels: activePanels } = this.state;
    // If choice is not active, add it
    const panelIsActive = _.findIndex(activePanels, { key }) !== -1;

    if (panelIsActive) {
      // Remove selected panel
      const otherPanels = _.filter(activePanels, item => item.key !== key);
      this.setState({
        [key]: !this.state[key],
        panels: otherPanels,
      });
    } else {
      // Add selected panel
      const selectedPanel = _.find(panelConfig, { key });
      const currentPanels = _.clone(this.state.panels);
      const originalIndex = _.findIndex(panelConfig, { key });

      currentPanels.splice(originalIndex, 0, selectedPanel);

      this.setState({
        [key]: !this.state[key],
        panels: currentPanels,
      });
    }
  }

  willLeave() {
    return { left: spring(-400) };
  }

  willEnter(styleThatEntered) {
    return { left: -400 };
  }

  render() {
    console.log('this.state', this.state);

    return (
      <div className="App">

        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.panels.map(({ key, component }) => {
            return ({
              key,
              data: { component },
              style: { left: spring(this.state.offset) },
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
