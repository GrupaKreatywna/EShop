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
UnnumberedList.propTypes = {
    primaryKey: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    display: PropTypes.string.isRequired,
}

export const Products = props => {
    const {data, primaryKey, nameProp, imgURLProp} = props;

    const mappedProducts = data.map(product => (
        <div key={product[primaryKey]} >
            <img src={product[imgURLProp]} alt={product[nameProp]}/>
            {product[nameProp]}
        </div>
    ));

    return <div>{mappedProducts}</div>
}
Products.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    primaryKey: PropTypes.string, //these are object property names, not property types itself
    nameProp: PropTypes.string,
    imgURLProp: PropTypes.string,
}

export class SearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    render() {  
        const searchResultItemStyle = (product, isHighlighted) => (
            <div key={product[this.props.primaryKey]} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {product[this.props.display]}
            </div>
        ); 
        
        return (
            <div>
                <Autocomplete
                    items={this.props.searchThrough}
                    getItemValue={item => item[this.props.display]}
                    shouldItemRender={(item, value) => item[this.props.display].toLowerCase().indexOf(value.toLowerCase())>-1}
                    renderItem={searchResultItemStyle}
                    
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={val => this.setState({ value: val })}
                />
            </div>
        );
    }
}
SearchAutocomplete.propTypes = {
    searchThrough: PropTypes.arrayOf(PropTypes.object).isRequired,
    primaryKey: PropTypes.string, //these are object property names, not actual properties
    display: PropTypes.string,
}

