import React, { Component } from 'react';
import { Route } from 'react-router';

import { Header } from './components/Header'; //TODO remake all exports to default exports

import { Home } from './components/Home/';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { Category } from './components/CategoryList';

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
        <div>
          <Header/>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/product/:id' render={ props => <ProductDetails {...props.match.params} />}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/category/:id' component = {Category}/>
          </div>
        </div>
    );
  }
}
