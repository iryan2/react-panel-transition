import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import _ from 'lodash';
import './App.css';

const LeftPanel = props => (
  <div className="panel left" style={props.style}>
    <h4>Left</h4>
    <button onClick={() => props.onClick(['middle'])}>
      Toggle middle
    </button>
  </div>
);

const MiddlePanel = props => (
  <div className="panel middle" style={props.style}>
    <h4>Middle</h4>
    <button onClick={() => props.onClick(['left', 'right'])}>
      Toggle left & right
    </button>
  </div>
);

const RightPanel = props => (
  <div className="panel right" style={props.style}>
    <h4>Right</h4>
    <button onClick={() => props.onClick(['left', 'right'])}>
      Close right, open left
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
      panels: [panelConfig[0]] ,
      offset: 0,
      leftFullWidth: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(keys) {
    let newPanels = _.clone(this.state.panels);

    // Toggle each panel
    keys.forEach(key => {
      const panelIsActive = _.findIndex(newPanels, { key }) !== -1;

      if (panelIsActive) { // Remove selected panel
        newPanels = _.filter(newPanels, item => item.key !== key);
      } else { // Add selected panel
        const selectedPanel = _.find(panelConfig, { key });
        const originalIndex = _.findIndex(panelConfig, { key });
        newPanels.splice(originalIndex, 0, selectedPanel);
      }
    });

    this.setState({
      panels: newPanels,
      leftFullWidth: newPanels.length === 1 ? true : false,
    });
  }

  willLeave({ data: { widthPercent } }) {
    return { left: spring(widthPercent * -1) };
  }

  willEnter({ data: { widthPercent } }) {
    return { left: widthPercent * -1 };
  }

  render() {
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
              let width = data.widthPercent;
              if (key === 'left' && this.state.leftFullWidth) width = 100;
              return (
                <data.component
                  key={key}
                  style={{
                    left: `${arr[0].style.left}%`,
                    width: `calc(${width}% - ${2 * data.marginSize}px)`,
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
