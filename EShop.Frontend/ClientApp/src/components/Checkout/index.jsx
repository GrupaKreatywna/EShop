import React, {Component} from 'react';

import * as env from '../../env'
import style from '../Login/style.css'

export class Checkout extends Component {
    constructor(props) {
        super(props);  
        
        let _fields = {};
        let namesOfInputFields = Object.keys(env.order) //get only the key names which are supposed to be displayed (eg. the user doesnt input the orderdate, so we dont show it)
            .filter(key => typeof env.order[key]["fieldname"] !== 'undefined')
            .forEach(key => _fields[key]='');

        this.state = {
            fields: {
                ..._fields, //are you a wizard
            },
            issues: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        let userToken = localStorage.getItem(env.tokenCookieName);

        if(!userToken) return;
        let userInfoRequestParams = {
            method: 'GET',
            headers: new Headers({
                "Authorization": userToken, //TODO change this later, backend uses OAuth 2.0 i think
            })
        };
        let userInfo = await (await fetch(env.host + env.apiUserInfo, userInfoRequestParams)).json();
        
        
    }

    handleChange(e) { //generic handleChange (uses "name" property of <input/>)
        e.persist();
        this.setState(prevState => ({
                fields: {
                    ...prevState.fields,
                    [e.target.name]: e.target.value 
                }
        }))
    };

    async handleSubmit(e) {
        e.preventDefault();
        
        const fieldContents = this.state.fields;

        /*let emptyFields = Object.keys(fieldContents).filter(key => !fieldContents[key]); //returns names of input fields that are empty
        emptyFields.forEach(emptyField => appendIssue(env.errorMessageStrings.fieldIsEmpty(mapNamesToStrings[emptyField])))*/
        
        let requestParams = {
            body: {
                ...this.state.fields,
                
                key: localStorage.getItem(env.guidCookieName),
                orderDate: Date.getTime(), //this is UTC
            }
        }
        fetch(env.host+env.apiOrder, requestParams);

    }

    render() {
        const inputFields = Object.keys(this.state.fields).map( key => {
            const {name, placeholder, fieldname, type} = env.order[key];
            return <input type={type} name={name} placeholder={placeholder} onChange={this.handleChange}/>
        });

        return(
            <div>
                <form onSubmit={this.handleSubmit} className={style.login__form}>
                    {inputFields}
                    <input type="submit" value="Zamów" />
                </form>
            </div>
        );
    }
}

                    /*key
                    
                    <input type="text" onChange={this.handleChange} name="address" placeholder="Adres" />
                    <input type="text" onChange={this.handleChange} name="contractingAuthority" placeholder="contractingAuthority" />
                    <input type="text" onChange={this.handleChange} name="city" placeholder="Miasto" />
                    <input type="text" onChange={this.handleChange} name="postalCode" placeholder="Kod pocztowy" />
                    <input type="text" onChange={this.handleChange} name="discountCouponId" placeholder="Adres" />
                    <input type="text" onChange={this.handleChange} name="address" placeholder="Adres" />
                    */

                    /*
        });*/
        //