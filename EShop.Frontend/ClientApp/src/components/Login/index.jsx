import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
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
            issues: [],
            redirect: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    userNotLoggedIn = () => (
        <div className={style.login}>
            <h1>Logowanie</h1>
            <form onSubmit={this.handleSubmit} className={style.login__form}>
                <input type="email" onChange={this.handleChange} name="email" placeholder="twojemail@przyklad.com"/>
                <input type="password" onChange={this.handleChange} name="password" placeholder="Hasło"/>
                <input type="submit" value="Zaloguj" className={style.buyButton}/>
            </form>
            <div>{this.state.issues.map(issue => <div>{issue}</div>)}</div>
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
    
   //this is very similar code to <Register/>'s handleSubmit
   //TODO refactor?
   //handleSubmit contains input validation
    async handleSubmit(e) {
        e.preventDefault();
        const fieldContents = this.state.fields;

        let _issues = [];

        let appendIssue = issue => _issues.push(issue);

        const mapNamesToStrings = {
            email: 'E-mail',
            password: 'Hasło',
        }

        const minimumPasswordLength = env.minimumPasswordLength; //this is enforced by the backend - server will return 400 bad request if password length is less than this (currently 6)

        let emptyFields = Object.keys(fieldContents).filter(key => !fieldContents[key]); //returns names of input fields that are empty
        emptyFields.forEach(emptyField => appendIssue(env.errorMessageStrings.fieldIsEmpty(mapNamesToStrings[emptyField])));

        if(fieldContents.password.length < minimumPasswordLength && !emptyFields.includes("password")) {
            appendIssue(env.errorMessageStrings.passwordTooShort);
        }

        if(_issues.length > 0) { 
            this.setState({issues: _issues});
            return; //dont attempt to send a Register POST request if there are any issues with the form
        } 
        
        const requestBody = {
            [env.userRegister.password]: fieldContents.password,
            [env.userRegister.email]: fieldContents.email,
        };
        
        const fetchParams = {
            method: 'POST',
            body: JSON.stringify(requestBody),

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        
        let response = await fetch(env.host+env.apiLogin, fetchParams);
        let responseCode = await response.status;        

        if(responseCode===401) { //bad login and/or password
            appendIssue(env.errorMessageStrings.incorrectLoginOrPassword);
        }

        else if(responseCode===200) {
            let token = await response.json();
            localStorage.setItem(env.tokenCookieName, token);
            this.setState({loginTokenExists: true});
        }

        else { //responseCode other than 200 or 401 are probably internal server error etc.
            appendIssue(env.errorMessageStrings.fetchFailed);
        }

        this.setState({issues: _issues}); //apply the issues from above        
        window.location.reload();
    }
    //TODO add e-mail address verification
    //TODO add password strength indicator (get one from npm probably)
    render() {
        if(this.state.loginTokenExists)
            return <Redirect to='/'/>
        else return this.userNotLoggedIn();
    }
}