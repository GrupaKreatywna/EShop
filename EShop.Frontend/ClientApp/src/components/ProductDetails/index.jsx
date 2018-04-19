import React, {Component} from 'react'
import PropTypes from 'prop-types'

import style from './style.css'
import * as env from '../../env.js'

export class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            price: 0,
        }
    }

    componentDidMount() {
        fetch(env.host + env.apiSingleProduct+this.props.match.params.id)
            .then(response => response.json())
            .then(json => this.setState({ product: json }));

        fetch(env.host + env.apiSinglePrice + this.state.product[env.product.currentPriceId])
            .then(response => response.json())
            .then(json => this.setState({ price: json[env.price.pricevalue] }))
    }
/* 
    routeHasIdParam = props => {
        if( ((typeof this.props.match.params.id) === "number" ) ) {
            ///add error logic here TODO
        }
        if( (this.state.product)) //if returned json is an empty array TODO 
    } */

    render() {

        return(
            <div id="wrapper">
                <img id="image" src={this.state.product[env.product.img]} alt={this.state.product[env.product.id]}/>
                <h1 id="name">{this.state.product[env.product.name]}</h1>
                <p id="description">{this.state.product[env.product.description]}</p>
                <p id="price"><b>{this.state.price[env.price.pricevalue]}</b></p>
        </div>
        )
    }

}

ProductDetails.propTypes = {

}