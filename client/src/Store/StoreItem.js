import React,{useEffect} from 'react';
import { getPrice,setupCheckout, getBackgroundImg} from '../lib';
import Aos from 'aos';
import "aos/dist/aos.css";

export let StoreItem = function({item, purchases,setCart}){
  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);
  const backgroundIMG = getBackgroundImg(item.imgNames[0]);
    return (
      <article
        onClick={()=>setupCheckout(item.price,item._id,setCart,item.name,item.publisher,purchases)}
        className='store-item'
        style={{ backgroundImage: backgroundIMG }}
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
      >
        <aside 
        className='item-info'
        data-aos="fade-in"
        >
          <h4>{item.name}</h4>
          <h5>{item.publisher}</h5>
          <h5>{item.category}</h5>
          {
            getPrice(item._id,purchases,item)
          }
        </aside>
      </article>
    );
};