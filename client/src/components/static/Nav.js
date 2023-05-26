import React, {useState} from 'react';
import searchIMG from '../../assets/search.svg';
import menuIMG from '../../assets/menu-outline.svg';
import '../../styles/Nav.css';

export default function Nav(){
  const [searchInput,setSearchInput] = useState('');
  
  let getNavMenu=function(){
    if (!localStorage.getItem('jwt')){
      return(
        <div className='nav-menu'>
          <a href='/login'>Login</a>
          <a href='/register'>Register</a>
        </div>
      )
    }else{
      return(
        <div className='nav-menu'>
          <a href='/user/orders'>My Orders</a>
          <p onClick={()=>{
            localStorage.removeItem('jwt');
            window.location.href='/';
          }}>Log-Out</p>
        </div>
      )
    }
     
  }
  return(
    <div className='nav'>
      <a className='nav-logo' href='/'>AppZone <span className='logo-alt'>an appstore demo by Anthony Infortunio</span></a>
      {/* <form method='GET' action={`http://localhost:5000/api/search/${searchInput}`} className='search'>
        <img className='search-logo' src={searchIMG} onClick={() => { document.querySelector('.search').submit(); }} />
        <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
      </form> */}
      {
        getNavMenu()
      }
    </div>
  )
}