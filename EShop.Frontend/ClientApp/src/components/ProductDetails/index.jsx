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
        this.changeCounter = this.changeCounter.bind(this);

    }

    async componentDidMount() {
        //TODO figure out what should be awaited and what should not (there are 2 awaits in each line below and two near setStates)
        let _product = await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json(); // ? shouldnt these be methods (in the Component body) instead of functions?
        let _price = async () => await(await fetch(env.host+env.apiSinglePrice+this.state.product[env.product.currentPriceId])).json();
        
        this.setState({product: _product}); //TODO figure out if this can be done in one setState
        this.setState({price: _price[env.price.value]}); // ! getPrice() is dependent on getProduct() - that's why setStates are separate
    }

    addProductToCart() {
        let guid = localStorage.getItem(env.guidCookieName);

        if (!guid) {       
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
                });
            }                  
            
            guid = uuidv4();
            localStorage.setItem(env.guidCookieName, guid);
        }
        
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
                [env.redisCartElement.quantity]: this.state.numberOfCopiesToBuy
            })
        })
    }
    
    render() { //TODO make "Add to cart" button grey out when pressed, and then make it display the status of the order, like "Item added to cart in quantity: 5"
    //TODO add remove from cart button
        return (
            <div className={style.product}>
                <img className={style.product__image} src={this.state.product[env.product.img]} alt={this.state.product[env.product.name]} />
                <h1 className={style.product__name}>{this.state.product[env.product.name]}</h1>
                <p className={style.product__description}>{this.state.product[env.product.description]}</p>
                <p className={style.product__price}><b>{this.state.price}</b></p>
                
                <Counter currentCount={this.state.numberOfCopiesToBuy} changeCounterCallback={delta => this.changeCounter(delta)}/>
                
                <button onClick={this.addProductToCart}>Dodaj do koszyka</button>
            </div>
        )
    }

    changeCounter(delta) {
        this.setState(prevState => ({numberOfCopiesToBuy: prevState.numberOfCopiesToBuy+delta}));
    }
}

const Counter = props => {
    let currentCopies = props.currentCount;
    const changeCounterCallback = props.changeCounterCallback;
    
    const changeCounterBy = delta => { 
        if(currentCopies+delta <= 0) return;
        changeCounterCallback(delta); 
    }
    
    const one = 1;
    //TODO add numberOfCopiesToBuy as a input field (so the user can manually input the required value)
    
    
    return( //TODO Add classNames to ProductDetails counter divs
        <div className={style.product__counter}>
            <button onClick={() => changeCounterBy(one)} className={style.product__counter__button}>+{one}</button>
            <button onClick={() => changeCounterBy(-one)} disabled={currentCopies<=1} >-{one}</button>
            <div>{currentCopies}</div>
        </div>
    )
    
}