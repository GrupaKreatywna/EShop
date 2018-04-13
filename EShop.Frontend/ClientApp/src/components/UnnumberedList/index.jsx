import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import * as env from '../../env';

export default class UnnumberedList extends Component {
    
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    
    componentDidMount() {
        fetch(env.host + env.apiCategories)
            .then(response=>response.json())
            .then(json => this.setState( { data: json }));
    }

    render() {
        
        const categoriesList = this.state.data.map(category=>(
            <li key={category[env.category.id]}>
                {category[env.category.name]}
            </li>
        ));
        
        return <ul>{categoriesList}</ul>;
    }
};