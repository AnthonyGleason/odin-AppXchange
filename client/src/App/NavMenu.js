import React, { useEffect, useState } from 'react';
import './NavMenu.css';

export default function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoginStatus(setIsLoggedIn);
  }, []);
  if (isLoggedIn) {
    return (
      <div className='nav-menu'>
        <a href='/user/orders'>My Orders</a>
        <p onClick={()=>{handleLogOut()}}>Log-Out</p>
      </div>
    );
  } else {
    // User is not logged in
    return (
      <div className='nav-menu'>
        <a href='/user/login'>Login</a>
        <a href='/user/register'>Register</a>
      </div>
    );
  }
};
const handleLogOut = function(){
  localStorage.removeItem('jwt');
  window.location.href = '/';
};
const checkLoginStatus = async function(loginStateSetter){
  const token = localStorage.getItem('jwt');
  let isValid = false;
  if (token) {
    await fetch('http://localhost:5000/api/user/verify', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => {
        return res.json();
      })
    .then((data) => {
      if (data.isValid === true) {
        isValid = true;
      } else {
        isValid = false;
      }
    });
  }
  loginStateSetter(isValid);
};