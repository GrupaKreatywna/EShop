import React, { Component } from 'react';
import { Route } from 'react-router';

import { Home } from './components/Home/';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/product/:id' component={ProductDetails}/>
          <Route path='/cart' component={Cart}/>
        </div>
    );
  }
}
