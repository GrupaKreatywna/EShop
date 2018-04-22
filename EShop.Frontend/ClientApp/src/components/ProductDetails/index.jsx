import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './style.css'
import * as env from '../../env.js'

export class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            price: 0,
            numberOfCopiesToBuy: 1,
        }

        this.IdRouteParam = this.props.match.params.id;
        
        this.addProductToCart = this.addProductToCart.bind(this);
        this.sendProductIdToRedis = this.addProductToCart.bind(this);
    }

    componentDidMount() {
        fetch(env.host + env.apiSingleProduct + this.IdRouteParam) //fetch product info
            .then(response => response.json())
            .then(json => this.setState({ product: json }));

            //TODO tell backend dudes the api/Price/:id price endpoint doesnt work (but merge from master first they mightve fixed it)
/*        fetch(env.host + env.apiSinglePrice + this.state.product[env.product.currentPriceId]) //fetch price associated with current product
            .then(response => response.json())
            .then(json => this.setState({ price: json[env.price.pricevalue] })) */
    }

    //TODO handle what happens when the id is invalid (doesnt exist in db etc)

    addProductToCart(e) {
        //e.preventDefault(); //TODO fix preventdefault error? maybe its because the button is not in a form
        const cartCookieName = "cart";
        let cart = JSON.parse(localStorage.getItem(cartCookieName));

        if (!cart) {       
            //TODO SWITCH TO GUID
            const generateuuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));                    
            cart = {
                uuid: generateuuid(), 
                products: Array(),
            };
        }
        //TODO handle duplicates
        cart.products.push({
            id:this.IdRouteParam, // * api/Product/[product id here] will always return an object with id equal to 0, use route URL param instead
            count: this.state.numberOfCopiesToBuy,
        });
        localStorage.setItem(cartCookieName, JSON.stringify(cart));
        
        //this.sendProductIdToRedis(cart.uuid); //takes everything it needs (id, productcount etc) from state TODO fix recursion?
    }

    sendProductIdToRedis(uuidArg) {
        //TODO fix "too much recursion" error
        fetch(env.host+env.postRedis, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: uuidArg,
                productid: this.IdRouteParam,
                productcount: this.state.numberOfCopiesToBuy,
            })
        })
    }

    render() {
        return (
            <div id="wrapper">
                <img id="image" src={this.state.product[env.product.img]} alt={this.state.product[env.product.name]} />
                <h1 id="name">{this.state.product[env.product.name]}</h1>
                <p id="description">{this.state.product[env.product.description]}</p>
                <p id="price"><b>{this.state.price[env.price.pricevalue]}</b></p>

                <button onClick={this.addProductToCart}>Dodaj do koszyka</button>
            </div>
        )
    }
}