import React from 'react';

import style from './style.css';

import UnnumberedList from '../UnnumberedList/'; //TODO: webpack aliases (to reove the "../")
import SearchAutocomplete from '../SearchAutocomplete';
import Products from '../Products/';

let placeholderCategories = [
  { id: '1', name: "category1placeholder" },
  { id: '2', name: "foo bar category !@# $ @ !" },
  { id: '3', name: "category3" }
];

export const Home = () => (
  <div className={style.Layout}>
      
      <UnnumberedList data={placeholderCategories} display='name' primaryKey='id'/>
      <SearchAutocomplete/>
      <Products/>
  
  </div>
)