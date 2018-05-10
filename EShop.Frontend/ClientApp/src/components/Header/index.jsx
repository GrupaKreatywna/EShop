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
            user: {},
            cartExists: localStorage.getItem(env.guidCookieName), //TODO use redux to track cart state (number of items etc.)
            userLoggedIn: localStorage.getItem(env.tokenCookieName),
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    
    async componentDidMount() {
        if (!this.state.userLoggedIn) return;

        this.setState({ userLoggedIn: localStorage.getItem(env.tokenCookieName) });
        const requestParams = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.userLoggedIn,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        let userInfo = await fetch(env.host + env.apiUserInfo, requestParams);
        let responseCode = await userInfo.status;

        if (responseCode === 200)
            this.setState({ user: await userInfo.json() });
        else if (responseCode === 401) { //session expired
            localStorage.clear(env.tokenCookieName);
            this.setState({ userLoggedIn: null });
        }
    }

    onLogoutClick() {
        localStorage.clear(env.tokenCookieName);
        this.setState({
            userLoggedIn: undefined,
        });
        window.location.reload();
    }

    render() {
        let returnValue = '';
        if(this.state.userLoggedIn)
            returnValue = (<div className={style.loginContainer}>Zalogowano jako {this.state.user["email"] || "?"} <a onClick={this.onLogoutClick} className={style.clickable}>Wyloguj</a></div>);
        else returnValue = (
            <div className={style.loginContainer}>
                <Link to='/login' className={style.loginInfo}>Logowanie</Link>
                <Link to ='/register' className={style.loginInfo}>Rejestracja</Link>
            </div>)
        return returnValue;
    }
}