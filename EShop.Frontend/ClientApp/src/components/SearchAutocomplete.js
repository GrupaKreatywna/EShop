import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

let placeholderItems = [
    { id: '1', productname: "przykladowy produkt" },
    { id: '2', productname: "Exiting Vim: Theory and Practice" },
    { id: '3', productname: "Podstawy Elektroniki i Elektrotechniki dla Studentów Informatyki" }
];


export class SearchAutocomplete extends Component {

    constructor() {
        super();
        this.state = {
            value: ""
        };
    }

    searchResultItemStyle = (product, isHighlighted) => (
        <div key={product.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {product.productname}
        </div>
    );
        
    render() {
        return (
            <div>
                <Autocomplete
                    items={placeholderItems}
                    shouldItemRender={(item, value) => item.productname.toLowerCase().indexOf(value.toLowerCase())>-1}
                    getItemValue={product => product.productname}
                    renderItem={this.searchResultItemStyle}
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    onSelect={val => this.setState({ value: val })}
                />
            </div>
        );
    }
}