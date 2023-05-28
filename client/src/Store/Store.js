import React, { useEffect, useState } from 'react';
import xIMG from '../assets/widgets/x.svg';
//setup animate on scroll for this component
import Aos from 'aos';
import "aos/dist/aos.css";
import './Store.css';

//problem is in this file it needs to be rewritten
export default function Store() {
  const [storeItems, setStoreItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cart, setCart] = useState({
    appID: '',
    total: 0,
  });

  useEffect(() => {
    Aos.init({duration: 2000});
    getStoreItems(setStoreItems);
    if (localStorage.getItem('jwt')) getPurchases(setPurchases);
  }, []);
  
  return (
    <div className='store'>
      {/* <p className='greeting'>
        Welcome to AppZone!
      </p> */}
      <div className='pop-up hidden'>
        <img src={xIMG} onClick={()=>{
          document.querySelector('.pop-up').classList.add('hidden');
          document.querySelector('.pop-up').classList.remove('flex');
          }} 
        />
        <p>You must be signed in to purchase an app.</p>
        <button className='form-submit' onClick={()=>{window.location.href='/login'}}>Login</button>
        <button className='form-submit' onClick={()=>{window.location.href='/register'}}>Register</button>
      </div>
      <form className='checkout hidden'>
        <img src={xIMG} onClick={()=>{
          document.querySelector('.checkout').classList.add('hidden');
          document.querySelector('.checkout').classList.remove('flex');
          }} 
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
        <p className='yellow'>By placing this order you will (not) be charged ${cart.total/100}</p>
        <button className='form-submit' onClick={()=>{handleCheckout(cart.appID)}} type='button'>Place Order</button>
      </form>
      <div className='store-item-container'>
        {storeItems.map((item, index) => {
          const getPrice = function(appID){
            let appFound = ownsApp(appID);
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
              onClick={()=>setupCheckout(item.price,item._id,setCart,purchases)}
              key={index}
              className='store-item'
              //need a better way to set background images here
              style={{ backgroundImage: `url(${[item.imgNames[0]]})` }}
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
  );
}

const ownsApp = function(appID,purchasesArr){
  let appFound=false;
  purchasesArr.forEach((order)=>{
    if (order.appID===appID)appFound = true;
  });
  return appFound;
}

const getStoreItems = async function (setStoreItems) {
  await fetch('http://localhost:5000/api/app', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setStoreItems(data.apps);
    });
};

const getPurchases = async function(setPurchases) {
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

const setupCheckout = function(appPrice,appID,setCart,purchases){
  //set cart
  setCart({
    appID: appID,
    appPrice: appPrice,
  })
  if(ownsApp(appID,purchases)){
    //item already purchased
  }else if (localStorage.getItem('jwt')){
    const checkoutElement = document.querySelector('.checkout');
    if (checkoutElement.classList.contains('hidden')){
      //hide form
      checkoutElement.classList.remove('hidden');
      checkoutElement.classList.add('flex');
    }else{
      //show form
      checkoutElement.classList.add('hidden');
      checkoutElement.classList.remove('flex');
    }
  }else{
    //display popup telling the user they need to sign in to checkout
    const popupElement = document.querySelector('.pop-up');
    if (popupElement.classList.contains('hidden')){
      //hide form
      popupElement.classList.remove('hidden');
      popupElement.classList.add('flex');
    }else{
      //show form
      popupElement.classList.add('hidden');
      popupElement.classList.remove('flex');
    }
  }
};
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