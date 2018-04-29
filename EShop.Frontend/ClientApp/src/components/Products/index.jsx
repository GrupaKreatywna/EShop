import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import * as env from '../../env';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(env.host + env.apiProducts)
        .then(response => response.json())
        .then(json => this.setState({data: json}));
    }

    render() {
        
        let mappedData = this.state.data.map(product => (
            <div key={product[env.product.id]} className={style.product}>
                <img src={product[env.product.img]} className={style.image} alt={product[env.product.name]}/>
                <div className={style.text}>{product[env.product.name]}</div>
            </div>
        ));
        
        return <div className={style.wrapper}>{mappedData}</div>
    }
}

export default Products;