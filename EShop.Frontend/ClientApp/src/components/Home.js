import React from 'react';
import {UnnumberedList, SearchAutocomplete, Products} from './BasicUI';
import style_Homepage from './styles/Home.css';
import style_BasicUI from './styles/BasicUI.css';


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



export const Homepage = () => (
  <div className={style_Homepage.HomepageLayout}>
      
      <UnnumberedList data={placeholderCategories} display='name' primaryKey='id'/>
      
      <div className={(style_BasicUI.main + ' ' + style_BasicUI.result)}>
        <SearchAutocomplete searchThrough={placeholderItems} display='productname' primaryKey='id' />
      </div>

      <Products data={placeholderItems} nameProp='productname' imgURLProp='img' primaryKey='id'/>
  
  </div>
)