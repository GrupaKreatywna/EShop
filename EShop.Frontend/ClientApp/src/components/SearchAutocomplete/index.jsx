import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'react-autocomplete';

import style from './style.css'

export default class SearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    render() {
        const searchResultItemStyle = (product, isHighlighted) => (
            <div key={product[this.props.primaryKey]} className={style.element + ' ' + (isHighlighted ? style.elementHighlighted : style.elementNormal)} >
                {product[this.props.display]}
            </div>
        );

        return (
            <div className={style.main + ' ' + style.elementsWrapper}>
                <Autocomplete
                    items={this.props.searchThrough}
                    getItemValue={item => item[this.props.display]}
                    shouldItemRender={(item, value) => item[this.props.display].toLowerCase().indexOf(value.toLowerCase()) > -1}
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
SearchAutocomplete.propTypes = {
    searchThrough: PropTypes.arrayOf(PropTypes.object).isRequired,
    primaryKey: PropTypes.string, //these are object property names, not actual properties
    display: PropTypes.string,
}
