import React from 'react';
import PropTypes from 'prop-types';

const UnnumberedList = props => {
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

export default UnnumberedList;