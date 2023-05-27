import React, { useEffect, useState } from 'react';
import xIMG from '../../assets/x.svg';
import minecraft1 from '../../assets/appimgs/minecraft1.jpg';
import btd61 from '../../assets/appimgs/btd61.jpg';
import fnaf1 from '../../assets/appimgs/fnaf1.jpg';
import flstudio1 from '../../assets/appimgs/flstudio1.jpg';
import terraria1 from '../../assets/appimgs/terraria1.jpg';
import dj1 from '../../assets/appimgs/dj1.jpg';
import wmw1 from '../../assets/appimgs/wmw1.jpg';
import af1 from '../../assets/appimgs/af1.png';
import sv1 from '../../assets/appimgs/sv1.jpg';

import '../../styles/Store.css';
import Aos from 'aos';
import "aos/dist/aos.css";

export default function Store() {
  const [storeItems, setStoreItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cartTotal,setCartTotal] = useState(0);
  const [cartAppID,setCartAppID] = useState('');
  const getStoreItems = async function () {
    await fetch('http://localhost:5000/api/app', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setStoreItems(data.apps);
      });
  };
  const ownsApp = function(appID){
    let appFound=false;
    purchases.forEach((order)=>{
      if (order.appID===appID)appFound = true;
    });
    return appFound;
  }
  useEffect(()=>{
    Aos.init({duration: 2000});
  },[]);

  const getPurchases = async function() {
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

  const setupCheckout = function(itemPrice,itemID){
    //set app id of item in cart
    setCartAppID(itemID);
    //set cart with price
    setCartTotal(itemPrice);
    if(ownsApp(itemID)){
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

  const handleCheckout = async function(){
    const response = await fetch(`http://localhost:5000/api/apps/${cartAppID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    });
    if (response.ok){
      window.location.href='/'
    }
  };

  useEffect(() => {
    getStoreItems();
    if (localStorage.getItem('jwt')) getPurchases();
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
        <p className='yellow'>By placing this order you will (not) be charged ${cartTotal/100}</p>
        <button className='form-submit' onClick={()=>{handleCheckout()}} type='button'>Place Order</button>
      </form>
      <div className='store-item-container'>
        {storeItems.map((item, index) => {
          let backgroundIMG = '';
          switch (item.imgNames[0]) {
            case 'minecraft1':
              backgroundIMG = `url(${minecraft1})`;
              break;
            case 'btd61':
              backgroundIMG = `url(${btd61})`;
              break;
            case 'fnaf1':
              backgroundIMG = `url(${fnaf1})`;
              break;
            case 'flstudio1':
              backgroundIMG = `url(${flstudio1})`;
              break;
            case 'terraria1':
              backgroundIMG = `url(${terraria1})`;
              break;
            case 'dj1':
              backgroundIMG = `url(${dj1})`;
              break;
            case 'wmw1':
              backgroundIMG = `url(${wmw1})`;
              break;
            case 'af1':
              backgroundIMG = `url(${af1})`;
              break;
            case 'sv1':
              backgroundIMG = `url(${sv1})`;
              break;
            default:
              break;
          }
          
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
              onClick={()=>setupCheckout(item.price,item._id)}
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
  );
}
