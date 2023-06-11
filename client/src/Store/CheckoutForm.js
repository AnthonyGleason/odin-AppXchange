import React, {useState} from 'react';
import { toggleElementVisibility } from '../lib';
import xButton from '../assets/widgets/x.svg';
import './CheckoutForm.css';
export default function CheckoutForm({cart}){
  const [firstNameInput,setFirstNameInput] = useState('');
  const [lastNameInput,setLastNameInput] = useState('');
  const [emailInput,setEmailInput] = useState('');
  const [addrLineOneInput,setAddrLineOneInput] = useState('');
  const [addrLineTwoInput,setAddrLineTwoInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [zipInput, setZipInput] = useState('');
  const [phoneNumberInput,setPhoneNumberInput] = useState('');
  const [ccnInput,setCcnInput] = useState('');
  const [cvcInput,setCvcInput] = useState('');
  const [expMonthInput,setExpMonthInput] = useState('');
  const [expYearInput,setExpYearInput] = useState('');

  const handleCheckout = async function(appID){
    const response = await fetch(`http://localhost:5000/api/apps/${appID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          addrLineOne: addrLineOneInput,
          addrLineTwo: addrLineTwoInput,
          city: cityInput,
          state: stateInput,
          zip: zipInput,
          phoneNumber: phoneNumberInput,
          ccn: ccnInput,
          cvc: cvcInput,
          expMonth: expMonthInput,
          expYear: expYearInput
        })
    });
    if (response.ok){
      window.location.href='/';
    }
  };

  return(
    <form className='checkout hidden'>
      <img 
        src={xButton}
        onClick={()=>{toggleElementVisibility('checkout')}} 
        alt='cross x button'
      />
      <div>
        <label>First Name:</label>
        <input value={firstNameInput} onChange={(e)=>{setFirstNameInput(e.target.value)}}/>
      </div>
      <div>
        <label>Last Name:</label>
        <input value={lastNameInput} onChange={(e)=>{setLastNameInput(e.target.value)}} />
      </div>
      <div>
        <label>Email:</label>
        <input value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} />
      </div>
      <div>
        <label>Address Line 1:</label>
        <input value={addrLineOneInput} onChange={(e)=>{setAddrLineOneInput(e.target.value)}}/>
      </div>
      <div>
        <label>Address Line 2:</label>
        <input value={addrLineTwoInput} onChange={(e)=>{setAddrLineTwoInput(e.target.value)}} />
      </div>
      <div>
        <label>City:</label>
        <input value={cityInput} onChange={(e)=>{setCityInput(e.target.value)}} />
      </div>
      <div>
        <label>State:</label>
        <input value={stateInput} onChange={(e)=>{setStateInput(e.target.value)}} />
      </div>
      <div>
        <label>Zip Code:</label>
        <input value={zipInput} onChange={(e)=>{setZipInput(e.target.value)}} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input value={phoneNumberInput} onChange={(e)=>{setPhoneNumberInput(e.target.value)}} />
      </div>
      <div>
        <label>Credit Card Number:</label>
        <input value={ccnInput} onChange={(e)=>{setCcnInput(e.target.value)}} />
      </div>
      <div>
        <label>Cvc:</label>
        <input value={cvcInput} onChange={(e)=>{setCvcInput(e.target.value)}} />
      </div>
      <div>
        <label>Exp Month</label>
        <input value={expMonthInput} onChange={(e)=>{setExpMonthInput(e.target.value)}} />
      </div>
      <div>
        <label>Exp Year</label>
        <input value={expYearInput} onChange={(e)=>{setExpYearInput(e.target.value)}} />
      </div>
      <p>{cart.itemName}</p>
      <p>{cart.itemAuthor}</p>
      <p className='yellow'>By placing this order you will (not) be charged ${cart.total/100}</p>
      <button className='form-submit' onClick={()=>{handleCheckout(cart.itemID)}} type='button'>Place Order</button>
    </form>
  )
};