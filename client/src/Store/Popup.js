import React from 'react';
import { toggleElementVisibility } from '../lib';
import xButton from '../assets/widgets/x.svg';
export default function Popup(){
  return(
    <div className='pop-up hidden'>
      <img
      src={xButton}
      onClick={()=>{toggleElementVisibility('pop-up')}} 
      alt='cross x button'
      />
      <p>You must be signed in to purchase an app.</p>
      <button className='form-submit' onClick={()=>{window.location.href='/user/login'}}>Login</button>
      <button className='form-submit' onClick={()=>{window.location.href='/user/register'}}>Register</button>
    </div>
  )
}