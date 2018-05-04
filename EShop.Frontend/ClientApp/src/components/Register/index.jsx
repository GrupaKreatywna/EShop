import React, {Component} from 'react';

import * as env from '../../env.js';
import style from '../Login/style.css'; //! Reusing css from <Login/>

export class Register extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            fields: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                passwordconfirm: '',
                address: '',
                city: '',
                postalcode: '',
            },
            issues: [],
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
            firstname: 'Imie',
            lastname: 'Nazwisko',
            email: 'E-mail',
            password: 'Hasło',
            passwordconfirm: 'Powtórz hasło',
            address: 'Adres',
            city: 'Miasto',
            postalcode: 'Kod pocztowy'
        }

        const minimumPasswordLength = 6; //this is enforced by the backend - server will return 400 bad request if password length is < 6
        const messageStrings = {
            passwordsDontMatch: 'Hasło i powtórzone hasło nie są takie same',
            fetchFailed: 'Kontakt z serwerem nie powiódł się. Spróbuj ponownie później',
            fieldIsEmpty: field => ['Pole', field, 'jest puste'].join(' '),
            passwordTooShort: 'Hasło jest zbyt krótkie - musi mieć przynajmniej ' + minimumPasswordLength + ' znaków',

        }

        let emptyFields = Object.keys(fieldContents).filter(key => !fieldContents[key]); //returns names of input fields that are empty
        emptyFields.forEach(emptyField => appendIssue(messageStrings.fieldIsEmpty(mapNamesToStrings[emptyField])))

        const anyPasswordFieldEmpty = emptyFields.includes("password") || emptyFields.includes("passwordconfirm");  
        if(fieldContents.password !== fieldContents.passwordconfirm) { //"passwords dont match" issue
            if(!anyPasswordFieldEmpty) //dont display the passwords dont match error when one of the password fields is empty
                appendIssue(messageStrings.passwordsDontMatch);
        }
        else if(fieldContents.password < minimumPasswordLength && !anyPasswordFieldEmpty) { //if passwords are the same and the password is shorther than minimumn and no password field is empty
            appendIssue(messageStrings.passwordTooShort);
        }


        if(_issues.length > 0) { //dont attempt to send a Register POST request if there are any issues with the form
            this.setState({issues: _issues});
            return;
        } 
        
        //TODO there's gotta be a better way to format this
        const requestBody = {
            [env.userRegister.name]: fieldContents.firstname,
            [env.userRegister.surname]: fieldContents.lastname,
            [env.userRegister.password]: fieldContents.password,
            [env.userRegister.email]: fieldContents.email,
            [env.userRegister.verified]: true, //this will be removed later, no idea what this does but keep it at true
            [env.userRegister.address]: fieldContents.address,
            [env.userRegister.city]: fieldContents.city,
            [env.userRegister.postalcode]: fieldContents.postalcode, 
        };
        
        const fetchParams = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        
        let responseCode = await (await fetch(env.host+env.apiRegister, fetchParams)).status;



        if(responseCode!==200) {
            appendIssue(messageStrings.fetchFailed);
            this.setState({issues: _issues});
        }

    }
    
    //TODO add e-mail address verification (low prio)
    //TODO add password strength indicator (get one from npm probably)
    //TODO add classNames for CSS
    render() { //! reusing CSS from <Login/>
        
        return(
            <div className={style.login}>
                <form onSubmit={this.handleSubmit} className={style.login__form}>
                    <input type="text" onChange={this.handleChange} name="firstname" placeholder="Imię" autoFocus=""/>
                    <input type="text" onChange={this.handleChange} name="lastname" placeholder="Nazwisko" />
                    <input type="email" onChange={this.handleChange} name="email" placeholder="twojemail@przyklad.pl"/>
                    <input type="password" onChange={this.handleChange} name="password" placeholder="Wpisz hasło" />
                    <input type="password" onChange={this.handleChange} name="passwordconfirm" placeholder="Potwierdź hasło"/>
                    <p/>
                    <input type="text" onChange={this.handleChange} name="address" placeholder={"Ulica (np. ul. Przykład 3A/25\)"} />
                    <input type="text" onChange={this.handleChange} name="city" placeholder="Miasto (np. Warszawa)"/>
                    <input type="text" onChange={this.handleChange} name="postalcode" placeholder="Kod pocztowy (np. 12-123)" />
                    <p/>
                    <input type="submit" value="Zarejestruj się" />
                </form>
                <div>
                    {this.state.issues.map(issue => <div>{issue}</div>)}
                </div>
            </div>
        )
    }
}