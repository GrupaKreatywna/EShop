import React, {Component} from 'react';

import * as env from '../../env'
import style from './style.css'


//TODO rewrite this completely this is not how it's supposed to be done
//async, await may be useful here but idk
export class Cart extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    
        this.getCartItemIdsFromStorage = JSON.parse(localStorage.getItem("cart")).products;
        this.mapProductIdsToFetchedProducts = this.mapProductIdsToFetchedProducts.bind(this);
        this.appendToProductsState = this.appendToProductsState.bind(this);

        /*cart={
            uuid:"somethingfoobar",
            products: [
                {
                    id:0,
                    count:5
                },
                {
                    id:1,
                    count:5,
                }
            ]
        }*/
        
    }

    componentDidMount() {
        this.mapProductIdsToFetchedProducts(this.getCartItemIdsFromStorage);
    }

    mapProductIdsToFetchedProducts(productIds) {
        return productIds.map(product=>(
            fetch(env.host+env.apiSingleProduct + product.id)
                .then(response => response.json())
                .then(json=>this.productComponent(json)) //take a fetched product and turn it into a component
                .then(component=>this.appendToProductsState(component)) //append component to state
        ))
    }

    appendToProductsState(arg) {
        let newarray = this.state.products;
        newarray.push(arg);
        this.setState({ products: newarray})
    }

    productComponent = product => (
        <div>
            <div>{product[env.product.name]}</div>
            <div>{product[env.product.description]}</div>
        </div>
    )

    render() {
        return this.state.products
    }
}


//<div class="price">{env.helpers.getPriceFromPriceId(productJSON[env.product.currentPriceId])}</div>