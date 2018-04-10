import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';


export const UnnumberedList = props => {
    const categoriesList = props.data.map(category=>(
        <li key={category[props.primaryKey]}>
            {category[props.display]}
        </li>
    ));

    return <ul>{categoriesList}</ul>;
};

export const Products = props => {
    const {data, primaryKey, nameProp, imgURLProp} = props;

    const mappedProducts = data.map(product => (
        <div key={product[primaryKey]} >
            <img src={product[imgURLProp]} alt={product[primaryKey]}/>
            {product[nameProp]}
        </div>
    ));

    return <div>{mappedProducts}</div>
}

export class SearchAutocomplete extends Component { //TODO add defaultProps, propTypes

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        const {searchThroughCollection, primaryKey, displayProp } = this.props;
        this.searchResultItemStyle = this.searchResultItemStyle.bind(this);
    }

    
    searchResultItemStyle = (product, isHighlighted) => (
        <div key={product[this.primaryKey]} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {product[this.displayProp]}
        </div>
    ); 
    render() {  
        return (
            <div>
                <Autocomplete
                    items={this.searchThroughCollection}
                    getItemValue={item => item[this.displayProp]}
                    shouldItemRender={(item, value) => item[this.displayProp].toLowerCase().indexOf(value.toLowerCase())>-1}
                    renderItem={this.searchResultItemStyle}
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={val => this.setState({ value: val })}
                />
            </div>
        );
    }
}

