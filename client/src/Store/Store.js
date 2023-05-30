import React,{useState,useEffect} from 'react';
import xButton from '../assets/widgets/x.svg';
import './Store.css';
import Aos from 'aos';
import "aos/dist/aos.css";

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

const toggleElementVisibility = function(classStr){
  const element = document.querySelector(`.${classStr}`);
  if (!element) return 0;
  if(element.classList.contains('flex')){
    element.classList.add('hidden');
    element.classList.remove('flex');
  }else{
    element.classList.remove('hidden');
    element.classList.add('flex');
  }
}

const handleCheckout = async function(appID){
  const response = await fetch(`http://localhost:5000/api/apps/${appID}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
  });
  if (response.ok){
    window.location.href='/'
  }
};

const ownsApp = function(appID,purchases){
  let appFound=false;
  if (!purchases) return false;
  purchases.forEach((order)=>{
    if (order.appID===appID)appFound = true;
  });
  return appFound;
}

const setupCheckout = function(itemPrice,itemID,setCart){
  setCart({
    total: itemPrice,
    itemID: itemID,
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
}
const getAndUpdateStoreItems = async function (setStoreItems) {
  await fetch('http://localhost:5000/api/app', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setStoreItems(data.apps);
  });
};
const getAndUpdatePurchases = async function(setPurchases) {
  try {
    const response = await fetch(`http://localhost:5000/api/user/purchases`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    const data = await response.json();
    setPurchases(data.purchases);
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default function Store(){
  const [cart,setCart] = useState({
    total: 0,
    itemID: '',
  })
  const [storeItems,setStoreItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  useEffect(()=>{
    Aos.init({duration: 2000});
    getAndUpdateStoreItems(setStoreItems);
    if (localStorage.getItem('jwt')) getAndUpdatePurchases(setPurchases);
  },[]);
  return(
    <div className='store'>
      <div className='pop-up hidden'>
        <img
        src={xButton}
        onClick={()=>{toggleElementVisibility('pop-up')}} 
        alt='cross x button'
        />
        <p>You must be signed in to purchase an app.</p>
        <button className='form-submit' onClick={()=>{window.location.href='/login'}}>Login</button>
        <button className='form-submit' onClick={()=>{window.location.href='/register'}}>Register</button>
      </div>
      <form className='checkout hidden'>
        <img 
          src={xButton}
          onClick={()=>{toggleElementVisibility('checkout')}} 
          alt='cross x button'
        />
        <div>
          <label>First Name:</label>
          <input />
        </div>
        <div>
          <label>Last Name:</label>
          <input />
        </div>
        <div>
          <label>Email:</label>
          <input />
        </div>
        <div>
          <label>Address Line 1:</label>
          <input />
        </div>
        <div>
          <label>Address Line 2:</label>
          <input />
        </div>
        <div>
          <label>Phone Number:</label>
          <input />
        </div>
        <div>
          <label>Credit Card Number:</label>
          <input />
        </div>
        <div>
          <label>CVV</label>
          <input />
        </div>
        <div>
          <label>Exp Date</label>
          <input type='date'/>
        </div>
        <p className='yellow'>By placing this order you will be charged ${cart.total/100}</p>
        <button className='form-submit' onClick={()=>{handleCheckout(cart.itemID)}} type='button'>Place Order</button>
      </form>
      <div className='store-item-container'>
        {storeItems.map((item, index) => {
          let backgroundIMG = getBackgroundImg(item.imgNames[0]);
          const getPrice = function(appID){
            let appFound = ownsApp(appID,purchases);
            if (appFound){
              return(
                <p>Purchased</p>
              )
            }else{
              return(
                <p>${item.price / 100}</p>
              )
            }
          }
          return (
            <div
              onClick={()=>setupCheckout(item.price,item._id,setCart)}
              key={index}
              className='store-item'
              style={{ backgroundImage: backgroundIMG }}
              data-aos="fade-in"
              data-aos-anchor-placement="top-bottom"
            >
              <div className='item-info'>
                <p>{item.name}</p>
                <p>{item.publisher}</p>
                <p>{item.category}</p>
                {
                  getPrice(item._id)
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}