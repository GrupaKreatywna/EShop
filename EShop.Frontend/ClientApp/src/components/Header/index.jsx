import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as env from '../../env.js';
import style from './style.css';

export class Header extends Component {
    constructor() {
        super();
        
        let cartExists = ( localStorage.getItem(env.guidCookieName)) ? true : false;
        let userLoggedIn = localStorage.getItem(env.tokenCookieName) ? true : false; //! you will need to change this later because the token will be moved from localStorage to cookies

        this.state = {
            cartExists: cartExists, //TODO use redux to track cart state (number of items etc.)
            userLoggedIn: userLoggedIn,
        }
    }
        //TODO make <Links> have className indicating that we are on the current route
    render() { //TODO add CSS (the Links should be flexbox elements)
        
        return(
            <div className={style.header}>
                <div className={style.button + ' ' + style.logo}>
                    <Link to='/'><img src="https://placehold.it/100/F00FFF/FFFF00?text=Logo+Placeholder" alt="EShop"/></Link>
                </div>
                <Link to='/' className={style.button}>Home</Link>
                <Link to='/cart' className={style.button}>Koszyk</Link>
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