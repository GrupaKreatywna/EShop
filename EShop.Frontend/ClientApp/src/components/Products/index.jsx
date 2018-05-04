import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import style from './style.css';
import * as env from '../../env';



export class Products extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        let products = await (await fetch(env.host + this.props.apiLink)).json();
        
        let productsAsComponents = products.map(product => (
            <div key={product[env.product.id]} className={style.product}>
                <Link to={'/product/' + product[env.product.id]}>
                    <img src={product[env.product.img]} className={style.image} alt={product[env.product.name]} />
                    <div className={style.text}>{product[env.product.name]}</div>
                </Link>
            </div>
        ));

        this.setState({data: productsAsComponents});
    }

    render = () => <div className={style.wrapper}>{this.state.data}</div>;
}

Products.propTypes = {
    apiLink: PropTypes.string.isRequired,
}