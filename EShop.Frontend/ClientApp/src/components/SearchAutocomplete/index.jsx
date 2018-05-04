import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Autocomplete from 'react-autocomplete';

import style from './style.css'
import * as env from '../../env.js'

//TODO Use the API endpoint for search
export default class SearchAutocomplete extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
            data: [],
            redirect:false,
        };
        this.onSelect = this.onSelect.bind(this);
    }
    async componentDidMount() {
        let searchresults = await(await fetch(env.host+env.apiProducts)).json();
        this.setState({data: searchresults})
    }

    render() {
        if(this.state.redirect)
            return this.state.redirect;

        return (
            <div className={style.main}>
                <Autocomplete
                    items={this.state.data}
                    getItemValue={item => item[env.product.name]}
                    shouldItemRender={(item, value) => item[env.product.name].toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={SearchResult}

                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={this.onSelect}

                    wrapperStyle={{position: 'relative'}} //see comment by CMTenger on https://github.com/reactjs/react-autocomplete/issues/284
                    menuStyle={{position: 'absolute', top: '40px', left: 0}}
                />
            </div>
        );
    }
    //this fires when a user clicks on a search result/presses enter
    onSelect(productName, productItem) { 
        this.setState({ value: productName }); //set input field to chosen product (more of an UX thing)
        this.setState({redirect: <Redirect to={'/product/' + productItem[env.product.id]}/>}); //redirect to product page
    }
}

const SearchResult = (product, isHighlighted) => {
    let isHovered =  (isHighlighted ? style.elementHighlighted : style.elementNormal);
    let currency = env.currency;
    return (
        <div key={product[env.product.id]} className={style.element + ' ' + isHovered}  >
            <div className={style.elementImageWrapper}>
                <img src={product[env.product.img]} className={style.elementImage} alt={product[env.product.name]}/>
            </div>
            
            <div className={style.elementText}>{product[env.product.name]}</div>
            <div className={style.elementPrice}>{env.formatPrice(String(product[env.product.price])) + ' ' + currency }</div>
        </div>
    )
}