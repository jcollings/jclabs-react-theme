import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Archive from './Archive/Archive';
import Single from './Single/Single';
import './App.scss';

class App extends Component {
  render() {
    // Requires that permalink structure is set to Post name
    return (
      <div className="site-wrapper">
        <Switch>
          <Route path="/:post">
            <Single />
          </Route>
          <Route path="/" exact={true}>
            <Archive />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
