import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import * as env from '../../env.js';
import style from '../Login/style.css'; //! Reusing css from <Login/>

const {name,surname,email,password,address,city,postalcode} = env.userRegister;

export class Register extends Component {
    constructor(props) {
        super(props);        

        this.state = {
            fields: {
                [name]: '',
                [surname]: '',
                [email]: '',
                [password]: '',
                [address]: '',
                [city]: '',
                [postalcode]: '',

                passwordconfirm: '', //this is not part of the "register user" POST (the API doesn't care about it)
            },
            issues: [],
            redirect: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        this.setState({issues: []}); //reset issues with the register form (issues are things like "name field empty", "passwords dont match" etc.)
        const fieldContents = this.state.fields;

        let _issues = [];

        let appendIssue = issue => _issues.push(issue);

        const mapNamesToStrings = {
            [name]: 'Imie',
            [surname]: 'Nazwisko',
            [email]: 'E-mail',
            [password]: 'Hasło',
            [address]: 'Adres',
            [city]: 'Miasto',
            [postalcode]: 'Kod pocztowy',
            
            passwordconfirm: 'Powtórz hasło',
        }

        const minimumPasswordLength = env.minimumPasswordLength; //this is enforced by the backend - server will return 400 bad request if password length is < 6

        let emptyFields = Object.keys(fieldContents).filter(key => !fieldContents[key]); //returns names of input fields that are empty
        emptyFields.forEach(emptyField => appendIssue(env.errorMessageStrings.fieldIsEmpty(mapNamesToStrings[emptyField])))

        const anyPasswordFieldEmpty = emptyFields.includes("password") || emptyFields.includes("passwordconfirm");  
        if(fieldContents.password !== fieldContents.passwordconfirm) { //"passwords dont match" issue
            if(!anyPasswordFieldEmpty) //dont display the passwords dont match error when one of the password fields is empty
                appendIssue(env.errorMessageStrings.passwordsDontMatch);
        }
        else if(fieldContents.password.length < minimumPasswordLength && !anyPasswordFieldEmpty) { //if passwords are the same and the password is shorther than minimumn and no password field is empty
            appendIssue(env.errorMessageStrings.passwordTooShort);
        }


        if(_issues.length > 0) { //dont attempt to send a Register POST request if there are any issues with the form
            this.setState({issues: _issues});
            return;
        } 

        const {passwordconfirm, ...postData} = this.state.fields; //postData contains everything from this.state.fields but "passwordconfirm"
        postData["verified"] = false; //no idea what it does, but its required. keep it at true anyways
        
        const fetchParams = {
            method: 'POST',
            body: JSON.stringify(postData),
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        
        let response = await fetch(env.host+env.apiRegister, fetchParams);
        let responseCode = await response.status;

        console.log(response.status);

        if(responseCode!==200 && responseCode!==204) {
            let responseBody = await response.json();
            if(responseBody["errors"]) {
                let serverErrorMessages = responseBody.errors.forEach(error => appendIssue(error.message));
            }
            this.setState({
                issues: _issues,
            });
        }
        else { //if ok
            this.setState({
                redirect: <Redirect to='/login'/>
            })
        }

    }
    
    //TODO add e-mail address verification (low prio)
    //TODO add password strength indicator (get one from npm probably)
    //TODO add classNames for CSS
    render() { //! reusing CSS from <Login/>
        if(localStorage.getItem(env.tokenCookieName))
            return <Redirect to='/'/>
        
        return(
            <div className={style.login}>
                {this.state.redirect}
                <h1>Rejestracja</h1>
                <form onSubmit={this.handleSubmit} className={style.login__form}>
                    <input type="text" onChange={this.handleChange} name={name} placeholder="Imię" autoFocus=""/>
                    <input type="text" onChange={this.handleChange} name={surname} placeholder="Nazwisko" />
                    <input type="email" onChange={this.handleChange} name={email} placeholder="twojemail@przyklad.pl"/>
                    <input type="password" onChange={this.handleChange} name={password} placeholder="Wpisz hasło" />
                    <input type="password" onChange={this.handleChange} name="passwordconfirm" placeholder="Potwierdź hasło"/>
                    <p/>
                    <input type="text" onChange={this.handleChange} name={address} placeholder={"Ulica (np. ul. Przykład 3A/25)"} />
                    <input type="text" onChange={this.handleChange} name={city} placeholder="Miasto (np. Warszawa)"/>
                    <input type="text" onChange={this.handleChange} name={postalcode} placeholder="Kod pocztowy (np. 12-123)" />
                    <p/>
                    <input type="submit" value="Zarejestruj się" className={style.buyButton}/>
                </form>
                <div>
                    {this.state.issues.map(issue => <div>{issue}</div>)}
                </div>
                {this.state.redirect}
            </div>
        )
    }
}