import React, { useEffect, useState } from 'react';
import './NavMenu.css';

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

export default function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoginStatus(setIsLoggedIn);
  }, []);
  if (isLoggedIn) {
    return (
      <ul className='nav-menu'>
        <li><a href='/user/orders'>My Orders</a></li>
        <li><p onClick={()=>{handleLogOut()}}>Log-Out</p></li>
      </ul>
    );
  } else {
    // User is not logged in
    return (
      <ul className='nav-menu'>
        <li><a href='/user/login'>Login</a></li>
        <li><a href='/user/register'>Register</a></li>
      </ul>
    );
  }
};