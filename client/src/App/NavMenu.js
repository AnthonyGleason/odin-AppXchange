import React, { useEffect, useState } from 'react';
import './NavMenu.css';

const handleLogOut = function(){
  localStorage.removeItem('jwt');
  window.location.href = '/';
};

const checkLoginStatus = async function(){
  const token = localStorage.getItem('jwt');
  let isValid = false;
  if (token) {
    await fetch('https://appxchange.herokuapp.com/api/user/verify', {
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
        // token is expired
        localStorage.removeItem('jwt');
      }
    });
  }
  return isValid;
};

export default function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const loginStatus = await checkLoginStatus();
      setIsLoggedIn(loginStatus);
    };
    fetchLoginStatus();
  }, []);
  
  if (isLoggedIn) {
    return (
      <ul className='nav-menu'>
        <li><a href='/AppXchange/#/user/orders'>My Orders</a></li>
        <li><p onClick={()=>{handleLogOut()}}>Log-Out</p></li>
      </ul>
    );
  } else {
    return (
      <ul className='nav-menu'>
        <li><a href='/AppXchange/#/user/login'>Login</a></li>
        <li><a href='/AppXchange/#/user/register'>Register</a></li>
      </ul>
    );
  }
};