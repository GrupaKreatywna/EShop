import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './style.css'
import * as env from '../../env.js'

//TODO handle history (this.props.history if you use react-router idk)
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
        let _product = await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json(); // ? shouldnt these be methods (in the Component body) instead of functions?
        let _price = await(await fetch(env.host+env.apiSinglePrice+_product[env.product.currentPriceId])).json();
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
        
    let fetchedProduct = this.state.product;
        
        return (
            <div className={style.productWrapper}>
            <div className={style.product}>
                
                <div className={style.imageWrapper}>
                    <img src={fetchedProduct[env.product.img]} alt={fetchedProduct[env.product.name]} />
                </div>
                
                <div className={style.infoWrapper}>
                    <div className={style.name}>
                        <b>{fetchedProduct[env.product.name]}</b>
                    </div>

                    <div className={style.price}>
                        {this.state.price}
                    </div>
                
                    <div className={style.description}>
                        <div><b>Opis:</b></div>
                        {fetchedProduct[env.product.description]}
                    </div>
            
                    <div className={style.counterWrapper}>
                        <div><b>Ilość sztuk:</b></div>
                        <Counter currentCount={this.state.numberOfCopiesToBuy} changeCounterCallback={delta => this.changeCounter(delta)}/>
                    </div>
                    <button onClick={this.addProductToCart} className={style.buyButton}>Dodaj do koszyka</button>
                
                </div>
                
            </div>
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
    
    //TODO add numberOfCopiesToBuy as a input field (so the user can manually input the required value)
    
    let buttonDisabled = (currentCopies<=1) ? style.disabled : ''; 

    const one = 1;
    return(
        <div className={style.counter}>
            <button onClick={() => changeCounterBy(-one)} className={style.counter__button + ' ' + buttonDisabled} disabled={currentCopies<=1} >-</button>
            <span className={style.counter__number}>{currentCopies}</span>
            <button onClick={() => changeCounterBy(one)} className={style.counter__button}>+</button>            
        </div>
    )
    
}