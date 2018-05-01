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
                <div className={style.header__logo}>
                    <img src="https://placehold.it/100/F00FFF/FFFF00?text=Logo+Placeholder" alt="EShop"/>
                </div>
                <Link to='/' className={style.header__button}>Home</Link>
                <Link to='/cart' className={style.header__button}>Koszyk</Link>
                <LoginStatus isLoggedIn={this.state.userLoggedIn}/>
            </div>
            )
        }

}

const LoginStatus = props => {
    if(props.isLoggedIn)
        return <div className={style.header__loginContainer}>Zalogowano jako __PLACEHOLDER__</div>
    else return (
        <div className={style.header__loginContainer + ' ' +style.header__button}>
            <Link to='/login' className={style.header__logininfo}>Logowanie</Link>
            <Link to ='/register' className={style.header__logininfo}>Rejestracja</Link>
        </div>
    )
}