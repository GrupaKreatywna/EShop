import React, {Component} from 'react';

import * as env from '../../env'
import style from '../Login/style.css'

export class Checkout extends Component {
    constructor(props) {
        super(props);  
        
        let _fields = {};

        //TODO refactor this and 'const neededFields' from componentDidMount() in this component
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
        const requestParams = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + userToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        let userInfo = await (await fetch(env.host + env.apiUserInfo, requestParams)).json();
        
        const neededFields = Object.keys(userInfo) //key array {0: key1, 1: key2} and so on
            .filter(key => env.order[key]) //take only keys which exist in env.order
            .reduce( (obj, key) => {obj[key]=userInfo[key]; return obj;}, {}); //turn {0: key1} array into {key1: value} object
        
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                ...neededFields,
            }
        }));
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
        
        let requestParams = {
            body: {
                ...fieldContents,
                key: localStorage.getItem(env.guidCookieName),
                orderDate: Date.getTime(), //this is UTC
            }
        }
        fetch(env.host+env.apiOrder, requestParams);

    }

    render() {
        const inputFields = Object.keys(this.state.fields).map( key => {
            const {name, placeholder, fieldname, type} = env.order[key];
            return <input key={name} type={type} name={name} placeholder={placeholder} onChange={this.handleChange} value={this.state.fields[key] || ""}/>
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

