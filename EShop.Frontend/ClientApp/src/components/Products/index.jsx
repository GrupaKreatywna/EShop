import React from 'react';
import PropTypes from 'prop-types';


const Products = props => {
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

export default Products;