import React from 'react';

import style from './style.css';
import * as env from '../../env.js';

import {CategoryWrapper} from '../UnnumberedList/'; //TODO: webpack aliases (to reove the "../")
import SearchAutocomplete from '../SearchAutocomplete';
import {Products} from '../Products/';

export const Home = () => (
  <div className={style.Layout}>

    <div className={style.gridCategories}>
      <CategoryWrapper/>
    </div>
    <div className={style.gridProductsMostPopular}>  
      <p><b>Najczęściej kupowane</b></p>
      <Products apiLink={env.apiRecentlyAddedProducts}/>
    </div>
    
    <div className={style.gridProductsRecentlyAdded}>
      <p><b>Ostatnio dodane</b></p>

      <Products apiLink={env.apiRecentlyAddedProducts}/>
    </div>
  
  </div>
)