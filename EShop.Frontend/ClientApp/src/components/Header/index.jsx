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
        
    render() { //TODO add CSS (the Links should be flexbox elements)
        
        console.log(style.header);
        
        return(
            <div className={style.header}>
                <div className={style.header__logo}>LoremIpsumLogoHere</div>
                <Link to='/' className='header__button'>Home</Link>
                <Link to='/cart' className='header__button'>Koszyk</Link>
                <LoginStatus isLoggedIn={this.state.userLoggedIn}/>
            </div>
            )
        }

}

const LoginStatus = props => {
    if(props.isLoggedIn)
        return <div className='header__logininfo'>Zalogowano jako __PLACEHOLDER__</div>
    else return 
        <div>
            <Link to='/login' className='header__logininfo'>Logowanie</Link>
            <Link to ='/register' className='header__logininfo'>Rejestracja</Link>
        </div>
}