import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.css';
import * as env from '../../env';

const {name, id, children, parentId} = env.category;

class UnnumberedList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState(prevState => (
            {
                isOpen: !prevState.isOpen,
            }
        ));
    }

    render() {
        const {categoryChildren, parentName, parentId} = this.props;

        let listedChildren = categoryChildren.map(child => <li key={child[id]}><UnnumberedList categoryChildren={child[children]} parentName={child[name]} parentId={child[id]}/></li>);

        const isOpenClass = this.state.isOpen ? style.open : style.closed;
        const isOpenClassParentName = this.state.isOpen ? style["parentName--open"] : style["parentName--closed"];
        const buttonCharacter = this.state.isOpen ? '▶' : '▼';
        
        
        const hasChildren = categoryChildren.length > 0;
        const button = hasChildren ? <button onClick={()=>this.toggleOpen()}> {buttonCharacter} </button> : null;

        
        return (
            <div >
                <div className={isOpenClassParentName}>
                    <Link to={'/category/'+parentId} >{parentName}</Link>
                    {button}
                </div>
                <div className={isOpenClass}>
                    <ul className={style.list}>
                        {listedChildren}
                    </ul>
                </div>
            </div>
        );
    }
};

UnnumberedList.propTypes = {
    categoryChildren: PropTypes.arrayOf(PropTypes.object).isRequired,
    parentName: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,
}

export class CategoryWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    async componentDidMount() {
        let categoriesJSON = await (await fetch(env.host + env.apiCategories)).json();
        
        const _categories = categoriesJSON.map(topLevelParentlessCategory => (
                <UnnumberedList
                    parentName={topLevelParentlessCategory[name]}
                    parentId={topLevelParentlessCategory[id]}
                    categoryChildren={topLevelParentlessCategory[children]}
                    key={topLevelParentlessCategory[id]}
                />
        ));
        this.setState({categories: _categories});
    }

    render = () => <div className={style.wrapper}>{this.state.categories}</div>;
}