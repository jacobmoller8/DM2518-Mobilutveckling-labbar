import React, { Component } from 'react';

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
        </header>
      </div>
    );
  }
}

export default App;
