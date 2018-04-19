export const host = 'http://localhost:1212'; //do not add a slash at the end

export const apiProducts = '/api/Products';
export const apiSingleProduct = '/api/Product/' //append product id to the end

export const apiSinglePrice = '/api/Price'

export const apiCategories = '/api/Categories';

export const postRedis = '/api/redis';

export const product = {
    id:'id',
    img: 'picture',
    name: 'name',
    currentPriceId: 'currentpriceid'
}

export const category = {
    id:'id',
    name: 'categoryname',
    description: 'description',
}

export const price = {
    pricevalue:'price'
}