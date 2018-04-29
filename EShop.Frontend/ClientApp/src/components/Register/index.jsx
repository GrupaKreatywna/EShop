import React, {Component} from 'react';

import * as env from '../../env.js';

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
            },
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
        const fields = this.state.fields;
        
        const requestBody = {
            [env.userRegister.name]: fields.firstname,
            [env.userRegister.surname]: fields.lastname,
            [env.userRegister.password]: fields.password,
            [env.userRegister.email]: fields.email,
            [env.userRegister.verified]: true, //this will be removed later
        };

        console.log(requestBody);
        
        const fetchParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        }
        
        let response = await (await fetch(env.host+env.apiRegister, fetchParams));
        console.log(response);
    }
    
    //TODO add e-mail address verification
    //TODO add password strength indicator (get one from npm probably)
    //TODO add classNames for CSS
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <p>Imie:<input type="text" onChange={this.handleChange} name="firstname"/></p>
                <p>Nazwisko<input type="text" onChange={this.handleChange} name="lastname" /></p>
                <p>E-mail:<input type="text" onChange={this.handleChange} name="email"/></p>
                <p>Hasło:<input type="password" onChange={this.handleChange} name="password"/></p>
                <p>Powtórz hasło:<input type="password" onChange={this.handleChange} name="passwordconfirm"/></p>
                <input type="submit"/>
            </form>
        )
    }
}