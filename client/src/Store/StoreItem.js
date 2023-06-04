import React,{useEffect} from 'react';
//app image imports
import minecraft1 from '../assets/appimgs/minecraft1.jpg';
import btd61 from '../assets/appimgs/btd61.jpg';
import fnaf1 from '../assets/appimgs/fnaf1.jpg';
import flstudio1 from '../assets/appimgs/flstudio1.jpg';
import terraria1 from '../assets/appimgs/terraria1.jpg';
import dj1 from '../assets/appimgs/dj1.jpg';
import wmw1 from '../assets/appimgs/wmw1.jpg';
import af1 from '../assets/appimgs/af1.png';
import sv1 from '../assets/appimgs/sv1.jpg';
import { toggleElementVisibility } from '../lib';
import Aos from 'aos';
import "aos/dist/aos.css";

export let StoreItem = function({item, purchases,setCart}){
  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);
  const backgroundIMG = getBackgroundImg(item.imgNames[0]);
    return (
      <article
        onClick={()=>setupCheckout(item.price,item._id,setCart,item.name,item.publisher)}
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
const getPrice = function(appID,purchases,item){
  const appFound = ownsApp(appID,purchases);
  if (appFound){
    return(
      <h5>Purchased</h5>
    )
  }else{
    return(
      <h5>${item.price / 100}</h5>
    )
  }
}

const ownsApp = function(appID,purchases){
  let appFound=false;
  if (!purchases) return false;
  purchases.forEach((order)=>{
    if (order.appID===appID)appFound = true;
  });
  return appFound;
};

const setupCheckout = function(itemPrice,itemID,setCart,itemName,itemAuthor){
  //if item is purchases do not open checkout
  setCart({
    total: itemPrice,
    itemID: itemID,
    itemName: itemName,
    itemAuthor: itemAuthor,
  });
  if(ownsApp(itemID)){
    //item already purchased do nothing
  }else if (localStorage.getItem('jwt')){
    toggleElementVisibility('checkout');
  }else{
    toggleElementVisibility('pop-up');
  }
};

const getBackgroundImg = function(imgName){
  switch (imgName) {
    case 'minecraft1':
      return(`url(${minecraft1})`);
    case 'btd61':
      return(`url(${btd61})`);
    case 'fnaf1':
      return(`url(${fnaf1})`);
    case 'flstudio1':
      return(`url(${flstudio1})`);
    case 'terraria1':
      return(`url(${terraria1})`);
    case 'dj1':
      return(`url(${dj1})`);
    case 'wmw1':
      return(`url(${wmw1})`);
    case 'af1':
      return(`url(${af1})`);
    case 'sv1':
      return(`url(${sv1})`);
    default:
      return(`url('')`);
  }
};