export const host = 'http://eshop-grupakreatywna.azurewebsites.net'; //do not add a slash at the end

export const apiProducts = '/api/Products';
export const apiSingleProduct = '/api/Product/'; //append product id to the end when using this endpoint in code
export const apiRecentlyAddedProducts = '/api/Product/Latest';
export const apiMostBoughtProducts = '/api/Product/Popular';
export const apiProductsFromCategory = '/api/Products/';

export const apiSinglePrice = '/api/Price/'

export const apiCategories = '/api/Categories/';

export const apiCartRedis = '/api/Cart/';
export const apiCartRedisDelete = '/api/Cart/delete/';

export const apiOrder = '/api/Order';

export const apiRegister = '/api/register/';
export const apiLogin = '/api/login';

export const apiUserInfo = '/api/user/info/';

export const tokenCookieName = 'token';
export const guidCookieName = 'guid';

export const product = {
    id:'id',
    img: 'img',
    name: 'name',
    price: 'price',
    currentPriceId: 'currentPriceId',
    description: 'description',
}

export const category = {
    id:'id',
    name: 'categoryName',
    children: 'children',
    parentId: 'parentId',
}

export const price = {
    value:'value',
}

export const redisCartElement = {
    key: "key",
    id: "id",
    quantity: "quantity",
}
//TODO make this work 

export const userRegister = {
    name: "name",
    surname: "surname",
    email: "email",
    password: "password",
    verified: "verified",
    address: "adress",
    city: "city",
    postalcode: "postalcode",
}

export const order = {
    key: {
        name:'key',
        placeholder: undefined,
        fieldname: undefined,
    },
    orderDate: {
        name:'orderDate',
        placeholder: undefined,
        fieldname: undefined,
    },
    email: {
        name: 'email',
        placeholder: 'E-mail, np. ja@przyklad.pl',
        fieldname: 'E-mail',
        type: 'email'
    },
    contractingAuthority: {
        name:'contractingAuthority',
        placeholder: 'Podmiot zamawiający (firma lub imie i nazwisko)',
        fieldname: 'Podmiot zamawiający',
        type: 'text'
    },
    city: {
        name:'city',
        placeholder: 'Miasto, np. Warszawa',
        fieldname: 'Miasto',
        type: 'text'
    },
    address: {
        name:'address',
        placeholder: 'Ulica, np. ul. Przykład 5B/21',
        fieldname: 'Ulica',
        type: 'text'
    },
    postalCode: {
        name:'postalCode',
        placeholder: 'Kod pocztowy, np 15-151',
        fieldname: 'Kod pocztowy',
        type: 'text'
    }, //camelcase consistency between userRegister and Order though
    discountCouponId: {
        name:'discountCouponId',
        placeholder: 'Kod rabatowy, np 123',
        fieldname: 'Kod rabatowy',
        type:'text'
    }
}

export const minimumPasswordLength=6;


export const errorMessageStrings = {
    passwordsDontMatch: 'Hasło i powtórzone hasło nie są takie same',
    fetchFailed: 'Kontakt z serwerem nie powiódł się. Spróbuj ponownie później',
    fieldIsEmpty: field => ['Pole', field, 'jest puste'].join(' '),
    passwordTooShort: 'Hasło jest zbyt krótkie - musi mieć przynajmniej ' + minimumPasswordLength + ' znaków',
    incorrectLoginOrPassword: 'Login lub hasło są niepoprawne.',
}

export const objToQueryString = function(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
}


export const currency = "PLN";

export const formatPrice = num => {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length === 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
}