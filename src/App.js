import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
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

        <Motion style={{x: spring(this.state.left ? 400 : 0)}}>
          {({x}) =>
            <div>

            {left &&
              <div className="panel left" style={{ left: x }}>
                <h4>Left</h4>
                <p>{x}</p>
                <br /><br /><br /><br />
                <div><TodoList /></div>
              </div>
            }

            {middle &&
              <div className="panel middle" style={{ left: x }}>
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
              <div className="panel right" style={{ left: x }}>
                <h4>Right</h4>
                <button onClick={() => this.handleClick('right')}>
                  Close right panel
                </button>
              </div>
            }

          </div>
          }

          </Motion>

      </div>
    );
  }
}

export default App;
