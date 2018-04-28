export const host = 'http://localhost:1212'; //do not add a slash at the end

export const apiProducts = '/api/Products';
export const apiSingleProduct = '/api/Product/'; //append product id to the end when using this endpoint in code
export const apiRecentlyAddedProducts = '/api/Product/Latest';
export const apiMostBoughtProducts = '/api/Product/PLACEHOLDER (not implemented yet)'

export const apiSinglePrice = '/api/Price/'

export const apiCategories = '/api/Categories/';

export const apiCartRedis = '/api/Cart/';

export const product = {
    id:'id',
    img: 'picture',
    name: 'name',
    currentPriceId: 'currentPriceId',
    description: 'description',
}

export const category = {
    id:'id',
    name: 'categoryname',
}

export const price = {
    value:'value',
}

export const redisCartElement = {
    key: "key",
    id: "id",
    quanity: "quantity",
}
//TODO make this work 

export const helpers = {
    
    fetchPriceFromPriceId: function(priceId) {
        let x = 0;
        fetch(host + apiSinglePrice + priceId) //fetch price associated with current product
            .then(response => response.json())
            .then(json => x=json[price.pricevalue])
        return x;
        },
}
