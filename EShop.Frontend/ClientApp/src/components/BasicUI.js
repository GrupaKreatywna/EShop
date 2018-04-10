import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete';


export const UnnumberedList = props => {
    const categoriesList = props.data.map(category=>(
        <li key={category[props.primaryKey]}>
            {category[props.display]}
        </li>
    ));

    return <ul>{categoriesList}</ul>;
}

export const Products = props => {
    
    //TODO find a better way to list what props
    //a component takes
    //the below is pretty dirty
    const data = props.data;    
    const primaryKey = props.primaryKey
    const nameProp = props.nameProp;
    const imgURLProp = props.imgProp;

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

        this.searchResultItemStyle = this.searchResultItemStyle.bind(this);
    }

    searchThroughCollection = this.props.searchThrough;    
    primaryKey = this.props.primaryKey
    displayProp = this.props.display;
    //TODO the above primaryKey and displayProp props are strings which are names of object props
    //they can be passed as product[displayProp] (in this case i'm trying to get product.displayProp)
    //but maybe it's possible to pass it as product[product.prop]? seems safer
    
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

