import React, { Component } from 'react';
import './App.css';
import TodoList from './Todo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="panel left">
          <button>Only open this panel</button>
          <button>Open details panel</button>

          <br /> <br /> <br /> <br />
          <div> <TodoList /> </div>
        </div>
        <div className="panel middle">
          <button>Toggle ancillary panel</button>
        </div>
        <div className="panel right">
          <button>Close ancillary panel</button>
        </div>
      </div>
    );
  }
}

export default App;
