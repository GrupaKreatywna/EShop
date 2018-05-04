export const host = 'http://localhost:1212'; //do not add a slash at the end

export const apiProducts = '/api/Products';
export const apiSingleProduct = '/api/Product/'; //append product id to the end when using this endpoint in code
export const apiRecentlyAddedProducts = '/api/Product/Latest';
export const apiMostBoughtProducts = '/api/Product/PLACEHOLDER (not implemented yet)'

export const apiSinglePrice = '/api/Price/'

export const apiCategories = '/api/Categories/';

export const apiCartRedis = '/api/Cart/';
export const apiCartRedisDelete = '/api/Cart/delete/';

export const apiRegister = '/api/register/';
export const apiLogin = '/api/login';

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
    address: "address",
    city: "city",
    postalcode: "postalcode",
}

export const currency = "PLN";

export const formatPrice = num => {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length == 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
}