import React, { Component } from 'react';
import { Route } from 'react-router';
import { Homepage } from './components/Home';
import { FetchData } from './components/FetchData';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <div>
          <Route exact path='/' component={Homepage} />
          <Route path='/fetchdata' component={FetchData} />
        </div>
    );
  }
}
