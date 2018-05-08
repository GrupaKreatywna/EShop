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
        
        const {id, img, name} = env.product;

        let productsAsComponents = products.map(product => (
            <Link to={'/product/' + product[id]}
                className={style.product}
                key={product[id]}
            >
                <img src={product[img]} className={style.image} alt={product[name]} />
                <div className={style.text}>{product[name]}</div>
            </Link>
        ));

        this.setState({data: productsAsComponents});
    }

    render = () => <div className={style.wrapper}>{this.state.data}</div>;
}

Products.propTypes = {
    apiLink: PropTypes.string.isRequired,
}