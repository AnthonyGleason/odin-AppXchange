import React from 'react';
import { toggleElementVisibility } from '../lib';
import xButton from '../assets/widgets/x.svg';
import './CheckoutForm.css';
export default function CheckoutForm({cart}){
  return(
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
        <label>CVV:</label>
        <input />
      </div>
      <div>
        <label>Exp Date:</label>
        <input type='date'/>
      </div>
      <p>{cart.itemName}</p>
      <p>{cart.itemAuthor}</p>
      <p className='yellow'>By placing this order you will be charged ${cart.total/100}</p>
      <button className='form-submit' onClick={()=>{handleCheckout(cart.itemID)}} type='button'>Place Order</button>
    </form>
  )
};

const handleCheckout = async function(appID){
  const response = await fetch(`http://localhost:5000/api/apps/${appID}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
  });
  if (response.ok){
    window.location.href='/';
  }
};