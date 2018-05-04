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
            numberOfCopiesToBuy: 1,
            alreadyAddedToCart: false,
        }

        this.idRouteParam = this.props.match.params.id; // this is the ID of the product this component views (from URL - localhost/product/[:id])        
        this.currency = env.currency;

        this.addProductToCart = this.addProductToCart.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
        this.changeCounter = this.changeCounter.bind(this);
    }

    async componentDidMount() {
        let _product = await(await fetch(env.host+env.apiSingleProduct+this.idRouteParam)).json(); // ? shouldnt these be methods (in the Component body) instead of functions?
        this.setState({product: _product});
    }

    async addProductToCart() {
        this.setState({alreadyAddedToCart: true});
        
        let guid = this.getGuid(env.guidCookieName);

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
        
        let requestBody = {
            method: 'POST',
            body: JSON.stringify({
                [env.redisCartElement.key]: guid,
                [env.redisCartElement.id]: this.idRouteParam,
                [env.redisCartElement.quantity]: this.state.numberOfCopiesToBuy
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }

    let responseCode = await(await fetch(env.host+env.apiCartRedis, requestBody)).status; //send items to redis
    return responseCode===200; //return true if added successfully
    }
    
    async removeProductFromCart() {
        
        if(this.state.alreadyAddedToCart === false) { //if trying to remove product from cart even though the product is not in the cart
            throw new Error("Tried to remove product from cart, but state.alreadyAddedToCart says the product is not in the cart");
        } 
        
        let guid = this.getGuid(env.guidCookieName);
        let requestParams = {
            method: 'POST',
            body: JSON.stringify({
                [env.redisCartElement.key]: guid,
                [env.redisCartElement.id]: this.idRouteParam,
                [env.redisCartElement.quantity]: this.state.numberOfCopiesToBuy
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        
        let responseCode = await (await fetch(env.apiCartRedisDelete, requestParams)).status;
        return responseCode===200; //return true if removed successfully
    }

    render() {
        
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
                        {env.formatPrice(String(fetchedProduct[env.product.price])) + ' ' + this.currency}
                    </div>
                
                    <div className={style.description}>
                        <div><b>Opis:</b></div>
                        {fetchedProduct[env.product.description]}
                    </div>
            
                    <div className={style.counterWrapper}>
                        <div><b>Ilość sztuk:</b></div>
                        <Counter currentCount={this.state.numberOfCopiesToBuy} changeCounterCallback={delta => this.changeCounter(delta)}/>
                    </div>
                    <AddToCartButton addProduct={this.addProductToCart} removeProduct={this.removeProductFromCart} productQuantity={this.state.numberOfCopiesToBuy}/>
                </div>
                
            </div>
        </div>
        )
    }

    changeCounter(delta) {
        this.setState(prevState => ({numberOfCopiesToBuy: prevState.numberOfCopiesToBuy+delta}));
    }

    getGuid(cookieName) {
        return localStorage.getItem(cookieName);
    }
}

const Counter = props => {
    let currentCopies = props.currentCount;
    const changeCounterCallback = props.changeCounterCallback;
    
    const changeCounterBy = delta => { //doesnt let you substract if current product count = 1
        if(currentCopies+delta <= 0) return;
        changeCounterCallback(delta); 
    }
    
    //TODO add numberOfCopiesToBuy as a input field (so the user can manually input the required value)
    
    const disabledCondition = currentCopies <=1; //disable "substract" button if
    let buttonDisabled = (disabledCondition) ? style.disabled : ''; 

    const one = 1;
    return(
        <div className={style.counter}>
            <button onClick={() => changeCounterBy(-one)} className={style.buttonMinus + ' ' + style.counter__button + ' ' + buttonDisabled} disabled={disabledCondition} >-</button>
            <span className={style.counter__number}>{currentCopies}</span>
            <button onClick={() => changeCounterBy(one)} className={style.counter__button + ' ' + style.buttonPlus}>+</button>            
        </div>
    )
    
}

class AddToCartButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alreadyAddedToCart: false,
            productsOnLastSubmit: undefined,
        }
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
    }

    //onAddButtonClick and onRemoveButtonClick call the respective add/remove function from props and check if the function finished successfully
    onAddButtonClick() {
        let addedSuccessfully = this.props.addProduct();

        if(!addedSuccessfully) return; //don't modify state if adding product failed (http response code is other than 200)
        console.log("im here");
        this.setState({
            alreadyAddedToCart: true,
            productsOnLastSubmit: this.props.productQuantity
        });
    }
    
    onRemoveButtonClick() {
        let removedSuccessfully = this.props.removeProduct();

        if(!removedSuccessfully) return;

        this.setState({
            alreadyAddedToCart: false,
            //productsOnLastSubmit will update on next submit anyway so we dont set it here
        })

    }

    render() { //TODO maybe i should just learn redux :thinking:
        const AddedProductInfo = props => ( //this renders if state.alreadyAddedToCart is true
            <button className={style.removeButton} onClick={this.onRemoveButtonClick}>Usuń</button>    
        )

        const showCondition = this.state.alreadyAddedToCart==true;
        
        let quantityInfo = showCondition ? 
            <div className={style.cartQuantityInfo}>
                Ten produkt znajduje się w koszyku w ilości {this.state.productsOnLastSubmit} TO NIE PRAWDA
            </div> : null;

        let productInfo = showCondition ? <AddedProductInfo removeProduct={this.removeProduct}/> : null; 

            //DO NOT use methods from props (props.addProduct), use this.onAddButtonClick() instead 
            return (
                <div>
                    <div className={style.addedInfoWrapper}>
                        <button onClick={this.onAddButtonClick} disabled={this.state.alreadyAddedToCart} className={style.buyButton}>Dodaj do koszyka</button>
                        {productInfo}
                    </div>
                    {quantityInfo}
                </div>
            )
        };
}