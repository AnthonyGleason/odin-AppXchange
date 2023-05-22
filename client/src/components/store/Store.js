import React, { useEffect, useState } from 'react';
import '../../styles/StoreItem.css';
import minecraft1 from '../../assets/appimgs/minecraft1.jpg';
import btd61 from '../../assets/appimgs/btd61.jpg';
import fnaf1 from '../../assets/appimgs/fnaf1.jpg';
import flstudio1 from '../../assets/appimgs/flstudio1.jpg';
import terraria1 from '../../assets/appimgs/terraria1.jpg';
import gtasa1 from '../../assets/appimgs/gtasa1.jpg';
export default function Store() {
  const [storeItems, setStoreItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [cartTotal,setCartTotal] = useState(0);
  const getStoreItems = async function () {
    await fetch('http://localhost:5000/api/app', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setStoreItems(data.apps);
      });
  };
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
  }
  const setupCheckout = function(itemPrice){
    //show form
    document.querySelector('.checkout').classList.remove('hidden');
    //set cart with price
    setCartTotal(itemPrice);
  }
  useEffect(() => {
    getStoreItems();
    if (localStorage.getItem('jwt')) getPurchases();
  }, []);

  return (
    <div className='store'>
      <form className='checkout hidden'>
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
        <p>By placing this order you will be charged ${cartTotal/100}</p>
        <button type='button'>Place Order</button>
      </form>
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
          case 'gtasa1':
            backgroundIMG = `url(${gtasa1})`;
            break;
          case 'terraria1':
            backgroundIMG = `url(${terraria1})`;
            break;
          default:
            break;
        }
        const getPrice = function(appID){
          let appFound=false;
          purchases.forEach((order)=>{
            if (order.appID===appID)appFound = true;
          });
          if (appFound){
            return(
              <p>Purchased</p>
            )
          }else{
            return(
              <p onClick={()=>setupCheckout(item.price)}>${item.price / 100}</p>
            )
          }
        }
        return (
          <div
            key={index}
            className='store-item'
            style={{ backgroundImage: backgroundIMG }}
          >
            <p>{item.name}</p>
            <p>{item.publisher}</p>
            <p>{item.category}</p>
            {
              getPrice(item._id)
            }
          </div>
        );
      })}
    </div>
  );
}
