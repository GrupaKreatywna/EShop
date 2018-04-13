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

let placeholderItems = [
  { id: '1', img:'https://placehold.it/32x32', productname: "przykladowy produkt", },
  { id: '2', img:'https://placehold.it/32x32', productname: "Exiting Vim: Theory and Practice" },
  { id: '3', img:'https://placehold.it/32x32', productname: "Podstawy Elektroniki i Elektrotechniki dla Studentów Informatyki" }
];


export const Home = () => (
  <div className={style.Layout}>
      
      <UnnumberedList data={placeholderCategories} display='name' primaryKey='id'/>
      <SearchAutocomplete searchThrough={placeholderItems} display='productname' primaryKey='id' />
      <Products data={placeholderItems} nameProp='productname' imgURLProp='img' primaryKey='id'/>
  
  </div>
)