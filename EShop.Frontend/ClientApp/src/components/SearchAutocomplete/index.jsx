import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'react-autocomplete';

import style from './style.css';
import * as env from '../../env';

export default class SearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            data: []
        };
    }

    componentDidMount() {
        fetch(env.host+env.apiProducts)
            .then(response => response.json())
            .then(json => this.setState({data:json}));
    }
    
    render() {
        
        const searchResultItemStyle = (product, isHighlighted) => (
            <div key={product[env.product.id]} className={style.element + ' ' + (isHighlighted ? style.elementHighlighted : style.elementNormal)} >
                {product[env.product.name]}
            </div>
        );

        return (
            <div className={style.main + ' ' + style.elementsWrapper}>
                <Autocomplete
                    items={this.state.data}
                    getItemValue={item => item[env.product.name]}
                    shouldItemRender={(item, value) => item[env.product.name].toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={searchResultItemStyle}

                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={val => this.setState({ value: val })}
                    wrapperStyle={{}}
                />
            </div>
        );
    }
}
