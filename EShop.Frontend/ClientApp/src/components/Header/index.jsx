import React, {Component} from 'react';
import { NavLink,Link } from 'react-router-dom';
import SearchAutocomplete from '../SearchAutocomplete';

import * as env from '../../env.js';
import style from './style.css';

export class Header extends Component {
    constructor() {
        super();
        
        this.state = {
            
        }
    }
        //TODO make <Links> have className indicating that we are on the current route
    render() { //TODO add CSS (the Links should be flexbox elements)
        
        return(
            <div className={style.header}>
                <div className={style.logo}>
                    <Link to='/'>EShop</Link>
                </div>
                {/*<NavLink 
                    to='/' 
                    activeClassName={style["button--activeroute"]} 
                    className={style.button}>
                        Home
                </NavLink> */}
                
                <NavLink 
                    to='/cart' 
                    activeClassName={style["button--activeroute"]} 
                    className={style.button}>
                    Koszyk
                </NavLink>
                
                <div className={ style.searchAutocompleteWrapper} >
                    <SearchAutocomplete/>
                </div>
                <LoginStatus/>
            </div>
            )
        }

}

class LoginStatus extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: undefined,
            cartExists: localStorage.getItem(env.guidCookieName), //TODO use redux to track cart state (number of items etc.)
            userLoggedIn: localStorage.getItem(env.tokenCookieName),
        }
    }
    
        componentDidMount() {
            const requestParams = {
                method:'GET'
            }
        }

    render() {
        let returnValue = '';
        if(this.state.userLoggedIn)
            returnValue = (<div className={style.loginContainer}>Zalogowano jako __PLACEHOLDER__</div>);
        else returnValue = (
            <div className={style.loginContainer}>
                <Link to='/login' className={style.loginInfo}>Logowanie</Link>
                <Link to ='/register' className={style.loginInfo}>Rejestracja</Link>
            </div>)
        return returnValue;
    }
}