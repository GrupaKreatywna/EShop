import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchAutocomplete from '../SearchAutocomplete';

import * as env from '../../env.js';
import style from './style.css';

export class Header extends Component {
    constructor() {
        super();
        
        this.state = {
            cartExists: localStorage.getItem(env.guidCookieName) ? true : false, //TODO use redux to track cart state (number of items etc.)
            userLoggedIn: localStorage.getItem(env.tokenCookieName) ? true : false,
        }
    }
        //TODO make <Links> have className indicating that we are on the current route
    render() { //TODO add CSS (the Links should be flexbox elements)
        
        return(
            <div className={style.header}>
                <div className={style.button + ' ' + style.logo}>
                    <Link to='/'><img src="https://unsplash.it/100?random" alt="EShop"/></Link>
                </div>
                <Link to='/' className={style.button}>Home</Link>
                <Link to='/cart' className={style.button}>Koszyk</Link>
                <div className={ style.button + ' ' + style.searchAutocompleteWrapper} >
                    <SearchAutocomplete/>
                </div>
                <LoginStatus isLoggedIn={this.state.userLoggedIn}/>
            </div>
            )
        }

}

const LoginStatus = props => {
    let returnValue;
    
    if(props.isLoggedIn)
        returnValue = (<div className={style.loginContainer + ' ' + style.button}>Zalogowano jako __PLACEHOLDER__</div>);
    
    else
        returnValue = (
            <div className={style.loginContainer}>
                <Link to='/login' className={style.button + ' ' + style.loginInfo}>Logowanie</Link>
                <Link to ='/register' className={style.button + ' ' + style.loginInfo}>Rejestracja</Link>
            </div>)

    return returnValue;
}