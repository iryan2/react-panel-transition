import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import TodoList from './Todo';

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

        <ReactCSSTransitionGroup transitionName="paneltrans" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          {left &&
            <div className="panel left">
              <h4>Left</h4>
              {/*
                <button>Only open this panel</button>
                <button>Open details panel</button>
                */}
                <br /><br /><br /><br />
                <div><TodoList /></div>
              </div>
            }

            {middle &&
              <div className="panel middle">
                <h4>Middle</h4>
                <button onClick={() => this.handleClick('left')}>
                  Toggle left panel
                </button>
                <button onClick={() => this.handleClick('right')}>
                  Toggle right panel
                </button>
              </div>
            }

            {right &&
              <div className="panel right">
                <h4>Right</h4>
                <button onClick={() => this.handleClick('right')}>
                  Close right panel
                </button>
              </div>
            }

        </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default App;
