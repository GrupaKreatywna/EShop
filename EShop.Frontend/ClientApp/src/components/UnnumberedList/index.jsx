import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import * as env from '../../env';

export default class UnnumberedList extends Component {
    
    constructor() {
        super();
        this.state = {
            data: [],
            isOpen: false,
        }
    }
    
    async componentDidMount() {
        if(!this.props.dataset && !this.props.categoryName) {
            let categoriesJSON = await (await fetch(env.host + env.apiCategories)).json();
            this.setState({data: categoriesJSON});
        }
    }

    render() {
        let bar = (this.props.dataset) ? this.props.dataset : this.state.data;
        let foo = bar.map( parent =>{
                if(parent.children.length == 0) {
                    console.log(parent[env.category.name]);
                    return (<li key={parent[env.category.id]}>{parent[env.category.name]}</li>);
                }

                return parent.children.map(child => {
                    let content = (child.children) ? <UnnumberedList dataset={child.children} categoryName={child[env.category.name]}/> : child[env.category.name]; 
                    return (
                        <li key={child[env.category.id]}>
                            {content}
                        </li>
                    )
                })
        });
        //when you call the topmost <UnnumberedList/> component it doesn't have props passed to it - if it doesn't have props, it fetches all categories then recursively creates itself with props
        let catName = (this.props.categoryName) ? this.props.categoryName : this.state.data[env.category.name];
        
        return (<ul className={style.list}>
            {catName}    
            {foo}
            </ul>)
    }
};