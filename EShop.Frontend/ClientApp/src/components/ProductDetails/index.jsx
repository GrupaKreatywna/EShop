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

    async componentDidMount() { //TODO will rewrite to async/await I Promise()
        
        //TODO figure out what should be awaited and what should not (there are 2 awaits in each line below and two near setStates)
        let getProduct = async () => await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json();
        let getPrice = async () => await(await fetch(env.host+env.apiSinglePrice+this.state.product[env.product.currentPriceId])).json();
        this.setState({product: await getProduct()});
        this.setState({price: (await getPrice()).value});
    }

            //TODO tell backend dudes the api/Price/:id price endpoint doesnt work (but merge from master first they mightve fixed it)
/*        fetch(env.host + env.apiSinglePrice + this.state.product[env.product.currentPriceId]) //fetch price associated with current product
            .then(response => response.json())
            .then(json => this.setState({ price: json[env.price.pricevalue] })) */

    //TODO handle what happens when the id is invalid (doesnt exist in db etc)
    //TODO remove cart products from localStorge (because Redis handles this now)

    addProductToCart(note) {
        const cartCookieName = "cart";
        let cart = JSON.parse(localStorage.getItem(cartCookieName));

        if (!cart) {       
            //TODO SWITCH TO GUID (or not, i don't know if they're the same thing)
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
                });
            }                  
            let generateduuid = uuidv4();
            console.log(generateduuid);
            cart = {
                uuid: generateduuid, 
                products: [],
            };
        }
        //TODO handle duplicates
        cart.products.push({
            id:this.IdRouteParam, // * api/Product/[product id here] will always return an object with id equal to 0, use route URL param instead
            count: this.state.numberOfCopiesToBuy,
        });
        localStorage.setItem(cartCookieName, JSON.stringify(cart));
        
        fetch(env.host+env.postRedis, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: cart.uuid,
                productid: this.idRouteParam,
                productcount: this.state.numberOfCopiesToBuy
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