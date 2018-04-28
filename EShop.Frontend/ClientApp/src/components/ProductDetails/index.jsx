import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './style.css'
import * as env from '../../env.js'

//TODO add item counter

export class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            price: 0,
            numberOfCopiesToBuy: 1,
        }

        this.price = 0;

        this.idRouteParam = this.props.match.params.id;
        
        this.addProductToCart = this.addProductToCart.bind(this);
        this.sendProductIdToRedis = this.addProductToCart.bind(this);
    }

    async componentDidMount() {
        
        //TODO figure out what should be awaited and what should not (there are 2 awaits in each line below and two near setStates)
        let getProduct = async () => await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json();
        let getPrice = async () => await(await fetch(env.host+env.apiSinglePrice+this.state.product[env.product.currentPriceId])).json();
        
        this.setState({product: await getProduct()}); 
        this.setState({price: (await getPrice())[env.price.value]});
    }

    //TODO handle what happens when the id is invalid (doesnt exist in db etc)

    //TODO add product counter

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

                <button onClick={this.addProductToCart}>Dodaj do koszyka</button>
            </div>
        )
    }
}