import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './style.css'
import * as env from '../../env.js'

//TODO handle what happens when the id is invalid (doesnt exist in db/is negative etc)
//TODO handle invalid fetches (this should be the same as the above TODO)

export class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            price: 0,
            numberOfCopiesToBuy: 1,
        }

        this.idRouteParam = this.props.match.params.id; // this is the ID of the product this component views (from URL - localhost/product/[:id])        
        this.addProductToCart = this.addProductToCart.bind(this);

        const Counter = props => {
            const changeCounterBy = delta => { 
                let currentCopies = this.state.numberOfCopiesToBuy;
                if(currentCopies+delta <= 0) return;
                this.setState({numberOfCopiesToBuy: currentCopies+delta}) 
            }
    
            const one = 1;
            return( //TODO Add classNames to ProductDetails counter divs
                <div>
                    <button onClick={() => changeCounterBy(one)}>+{one}</button>
                    <button onClick={() => changeCounterBy(-one)}>{-one}</button>
                    <div>{this.state.numberOfCopiesToBuy}</div>
                </div>
            )
        }
    }

    async componentDidMount() {
        //TODO figure out what should be awaited and what should not (there are 2 awaits in each line below and two near setStates)
        let getProduct = async () => await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json(); // ? shouldnt these be methods (in the Component body) instead of functions?
        let getPrice = async () => await(await fetch(env.host+env.apiSinglePrice+this.state.product[env.product.currentPriceId])).json();
        
        this.setState({product: await getProduct()}); //TODO figure out if this can be done in one setState
        this.setState({price: (await getPrice())[env.price.value]}); // ! getPrice() is dependent on getProduct()
    }


    
    addProductToCart(e) {
        const guidCookieName = "guid";
        let guid = localStorage.getItem(guidCookieName);

        if (!guid) {       
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
                });
            }                  
            
            guid = uuidv4();
        }
        localStorage.setItem(guidCookieName, guid);
        
        // ! POSTing to Redis as JSON doesn't work at the time I'm writing this. Use query string params instead (see the url inside swagger)
        fetch(env.host+env.apiCartRedis, { //send items to redis
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [env.redisCartElement.key]: guid,
                [env.redisCartElement.id]: this.idRouteParam,
                [env.redisCartElement.quanity]: this.state.numberOfCopiesToBuy
            })
        })
    }

    render() {
        return (
            <div id="wrapper">
                <img id="image" src={this.state.product[env.product.img]} alt={this.state.product[env.product.name]} />
                <h1 id="name">{this.state.product[env.product.name]}</h1>
                <p id="description">{this.state.product[env.product.description]}</p>
                <p id="price"><b>{this.state.price}</b></p>
                
                <Counter/>
                
                <button onClick={this.addProductToCart}>Dodaj do koszyka</button>
            </div>
        )
    }
}