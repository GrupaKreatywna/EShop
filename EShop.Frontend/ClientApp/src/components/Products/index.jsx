import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
            <div key={product[env.product.id]} >
                <img src={product[env.product.img]} alt={product[env.product.name]}/>
                {product[env.product.name]}
            </div>
        ));
        
        return <div>{mappedData}</div>
    }
}

export default Products;