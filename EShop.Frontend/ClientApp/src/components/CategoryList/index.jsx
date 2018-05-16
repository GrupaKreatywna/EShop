import React from 'react';
import { Link } from 'react-router-dom';

import * as env from '../../env.js';
import style from './style.css';

const CompactProduct = product => { //this is similar to the SearchResult component of <SearchAutocomplte/>
    let currency = env.currency;
    return (
        <Link key={product[env.product.id]} className={style.element + ' '}  to={'/product/'+env.product.id}>
            <div className={style.elementImageWrapper}>
                <img src={product[env.product.img]} className={style.elementImage} alt={product[env.product.name]}/>
            </div>
            
            <div className={style.elementText}>{product[env.product.name]}</div>
            <div className={style.elementPrice}>{env.formatPrice(String(product[env.product.price])) + ' ' + currency }</div>
            
        </Link>
    )
}

export class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    async componentDidMount() {
        let response = await fetch(env.host + env.apiProductsFromCategory + this.props.match.params.id); // ! this probably wont work, use query string instead
        let productsFromCategory = await response.json();
        let mappedProducts = productsFromCategory.map(product => CompactProduct(product));
        this.setState({products: mappedProducts});
    }

    render() {
        return(
            <div>
                {this.state.products}
            </div>
        )
    }

    
}