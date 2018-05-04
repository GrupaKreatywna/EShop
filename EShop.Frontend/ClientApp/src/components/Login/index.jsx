import React, {Component} from 'react';

import * as env from '../../env.js';
import style from './style.css';
//i am actually ashamed of myself this is exactly the same code as in <Register/>
//TODO
// ! TOKEN __NEEDS__ TO BE HELD IN RESTRICTED COOKIES INSTEAD OF LOCAL/SESSIONSTORAGE - see react-cookie lib
export class Login extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            fields: {
                email: '',
                password: '',
            },
            loginTokenExists: (localStorage.getItem(env.tokenCookieName) ? true : false),
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    userNotLoggedIn = () => (
        <div className={style.login}>
            <form onSubmit={this.handleSubmit} className={style.login__form}>
                <input type="email" onChange={this.handleChange} name="email" placeholder="twojemail@przyklad.com"/>
                <input type="password" onChange={this.handleChange} name="password" placeholder="Hasło"/>
                <input type="submit" value="Zaloguj"/>
            </form>
        </div>
    )

    handleChange(e) {
        e.persist();
        this.setState(prevState => ({
                fields: {
                    ...prevState.fields,
                    [e.target.name]: e.target.value 
                }
            }
        ));
    }
    
    //TODO add input validation
    async handleSubmit(e) {
        e.preventDefault();
        const fields = this.state.fields;
        
        const requestBody = {
            [env.userRegister.password]: fields.password,
            [env.userRegister.email]: fields.email,
        };
        
        const fetchParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        }
        
        let token = await (await fetch(env.host+env.apiLogin, fetchParams)).json();
        localStorage.setItem(env.tokenCookieName, token);
        this.setState({loginTokenExists: true});
    }
    
    
    //TODO add e-mail address verification
    //TODO add password strength indicator (get one from npm probably)
    //TODO add classNames for CSS
    render() {
        if(this.state.loginTokenExists)
            return <div>Jesteś zalogowany!</div>
        else return this.userNotLoggedIn();
    }
}