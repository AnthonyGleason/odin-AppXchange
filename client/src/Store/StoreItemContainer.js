import React from 'react';
import { StoreItem } from './StoreItem';

export let StoreItemContainer = function({storeItems,purchases,setCart}){
  return(
    <section className='store-item-container'>
      {storeItems.map((item, index) => {
        return(<StoreItem item={item} key={index} purchases={purchases} setCart={setCart} />)
      })}
    </section>
  )
};