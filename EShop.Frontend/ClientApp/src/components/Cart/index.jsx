import React, {Component} from 'react';

import * as env from '../../env'
import style from './style.css'

export class Cart extends Component {
    constructor() {
        super();
        this.state = {
            productIds: [],
            products: [],
            guidCookieExists: false,
        }
    }

    async componentDidMount() {
        const guid = localStorage.getItem("guid");

        this.setState({
            guidCookieExists: (guid ? true : false), //guidCookieExists will be used to display a message like "whoops looks like you didnt add anything to cart"
        })

        if(!guid) return;
        
        let query = env.apiCartRedis.slice(0,-1)+'?'+env.redisCartElement.key+'='+guid // /api/Cart?key=[guidhere]
        let cartProductIdsQuantitiesForGuid = await fetch(env.host + query); //[{id: [ID here], quantity: [how much of that product someone wants to buy]}, {id:.., quantity:..}] and so on
        let productIdsAndQuantities = await cartProductIdsQuantitiesForGuid.json(); 
        
        //TODO refactor this
        let finalProducts = productIdsAndQuantities.map(async (cartElement)=>{
            
            let product = await (await fetch(env.host+env.apiSingleProduct+cartElement.id)).json();
            let price = await (await fetch(env.host+env.apiSinglePrice+product[env.product.currentPriceId])).json(); //the "product" object contains the priceId, not the price itself. We need to fetch the price value

            let joinedProduct = { //here we join the cartElement fetch (it's outside this map()), the product fetch and price fetch into one object containg all the things we need
                id: cartElement[env.redisCartElement.id],
                img: product[env.product.img],
                name: product[env.product.name],
                description: product[env.product.description],
                quantity: cartElement[env.redisCartElement.quantity],
                price: price[env.price.value],
            }

            let productAsComponent = this.productComponent(joinedProduct);

            let currentProducts = this.state.products;
            currentProducts.push(productAsComponent);
            this.setState({products: currentProducts});
        });
        console.log(this.state.products)
    }

    //TODO add remove from cart button
    productComponent = joinedProduct => (
        <div key={joinedProduct.id}>
            <div>{joinedProduct.name}</div>
            <div>{joinedProduct.description}</div>
            <div>
                <span>Należność: {joinedProduct.quantity*joinedProduct.price} zł</span>
                <div>{joinedProduct.quantity} x {joinedProduct.price}</div>
            </div>
        </div>
    )

    render() {
        return (
            <div className={style.wrapper} >
                {(this.state.products.length > 0 ? this.state.products : "Twój koszyk jest pusty")}
            </div>
        )
    }
}


//<div class="price">{env.helpers.getPriceFromPriceId(productJSON[env.product.currentPriceId])}</div>