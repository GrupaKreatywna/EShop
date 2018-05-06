import React, {Component} from 'react';

import * as env from '../../env'
import style from './style.css'

import {ProductDetails} from '../ProductDetails';

export class Cart extends Component {
    constructor() {
        super();
        this.state = {
            productIds: [],
            products: [],
            guidCookieExists: false,
            prices: {0:0}
        }
    }

    async componentDidMount() {
        const guid = localStorage.getItem("guid");

        this.setState({
            guidCookieExists: (guid ? true : false), //guidCookieExists will be used to display a message like "whoops looks like you didnt add anything to cart"
        })

        if(!guid) return;
        
        let query = env.apiCartRedis.slice(0,-1)+'?'+env.redisCartElement.key+'='+guid // /api/Cart?key=[guidhere]
        
        let requestProductIdsAndQuantitiesForGuid = await fetch(env.host + query); //[{id: [ID here], quantity: [how much of that product someone wants to buy]}, {id:.., quantity:..}] and so on
        let productIdsAndQuantities = await requestProductIdsAndQuantitiesForGuid.json(); 
        
        //TODO refactor this
        let finalProducts = productIdsAndQuantities.map(cartElement => {
            //TODO initialAdded and initialQuantity should be a single object, much like in setState
            let elemId = cartElement[env.redisCartElement.id];
            
            let callback = totalPrice => { //this function takes the total price (quantity * price) and sets it to an object property inside this.state.prices that is equal to the product id
                //so youre going to have {[productId]:[pricehere], 29: 350} etc.
                
                const prices = this.state.prices;
                prices[elemId] = totalPrice;
                console.log("prices[elemid]", totalPrice);
                
                this.setState({prices: prices});
            };


            
            return <ProductDetails 
                    id={elemId} 
                    initialAdded={true} 
                    initialQuantity={cartElement[env.redisCartElement.quantity]}
                    totalPriceCallback={callback}/>
        });
        
        console.log(finalProducts);
        this.setState({products: finalProducts});
    }

    onOrderClick() {
        fetch()
    }

    //TODO add remove from cart button

    render() {
        
        const sum = Object.values(this.state.prices).reduce((sum,x)=>sum+x);
        
        const cartExists = (
        <div>
            <div>Total:{sum}</div>
            <div>{this.state.products}</div>
            <button onClick={null}>Zatwierdź</button>
        </div>)
        
        return (
            <div className={style.wrapper}>
                {this.state.products.length > 0 ? cartExists : "Twój koszyk jest pusty"}
            </div>
        )
    }
}