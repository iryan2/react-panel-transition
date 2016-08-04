import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import _ from 'lodash';
import './App.css';

const LeftPanel = props => {
  console.log('props.style', props.style);
  return (
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
}

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
  widthPercent: 41.667,
  marginSize: 8,
}, {
  key: 'middle',
  component: MiddlePanel,
  widthPercent: 58.333,
  marginSize: 8,
}, {
  key: 'right',
  component: RightPanel,
  widthPercent: 41.667,
  marginSize: 8,
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
    return { left: spring(-41.667) };
  }

  willEnter(styleThatEntered) {
    return { left: -41.667 };
  }

  render() {
    console.log('this.state', this.state);

    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={this.state.panels.map(({ key, ...rest }) => {
          return ({
            key,
            data: { ...rest },
            style: { left: spring(this.state.offset) },
          })
        })}>

        {interpolatedStyles =>
          <div>
            {interpolatedStyles.map(({ key, data }, i, arr) => {
              return (
                <data.component
                  key={key}
                  style={{
                    left: `${arr[0].style.left}%`,
                    width: `calc(${data.widthPercent}% - ${2 * data.marginSize}px)`,
                    margin: `${data.marginSize}px`,
                  }}
                  onClick={this.handleClick}
                />
              );
            })}
          </div>
        }

      </TransitionMotion>
    );
  }
}

export default App;
