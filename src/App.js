import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MainScreen from "./MainScreen/MainScreen";
import Lab1Screen from "./Lab1/Components/Container/Lab1Screen";
import Lab2StackNavigator from "./Lab2/Navigation/Lab2StackNavigator";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'DM2518 Labs',
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/" render={() => <MainScreen />} />
          <Route path="/Lab1Screen" render={() => <Lab1Screen />} />
          <Route path="/Lab2StackNavigator" render={() => <Lab2StackNavigator />} />
        </header>
      </div>
    );
  }
}

export default App;
