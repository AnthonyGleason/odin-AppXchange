import React, {useState} from 'react';
import searchIMG from '../../assets/search.svg';
import menuIMG from '../../assets/menu-outline.svg';
import '../../styles/Nav.css';

export default function Nav(){
  const [searchInput,setSearchInput] = useState('');
  const [emailInput,setEmailInput] = useState('');
  const [passInput,setPassInput] = useState('');
  let handleLogin = async function(){
    await fetch('http://localhost:5000/api/user/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passInput,
      }),
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      if (data.token){
        localStorage.setItem('jwt',data.token);
        console.log('logged in user');
        window.location.href='.';
      }
    })
  };
  let getNavMenu=function(){
    if (!localStorage.getItem('jwt')){
      return(
        <div className='nav-menu'>
          <a href='/register'>Register</a>
          <div 
            onClick={()=>{
              const login = document.querySelector('#login');
              if (login.classList.contains('hidden')){
                login.classList.remove('hidden');
              }else{
                login.classList.add('hidden');
              }
              }}
            className='nav-dropdown'
          >
            <p>Log-In</p>
            {/*<img alt='drop down menu arrow facing down' src={menuIMG} />*/}
          </div>
          {/*leaving method and action here for readability however the submission is handled through handleLogin function*/}
          <form id='login' className='hidden' method='POST' action='http://localhost:5000/api/user/login'> 
            <div>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' name='password' value={passInput} onChange={(e)=>{setPassInput(e.target.value)}}/>
            </div>
            <button onClick={()=>handleLogin()} type='button'>Log In</button>
          </form>
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
      <a href='/'>AppZone</a>
      <form method='GET' action={`http://localhost:5000/api/search/${searchInput}`} className='search'>
        <img alt='search-logo' src={searchIMG} onClick={() => { document.querySelector('.search').submit(); }} />
        <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
      </form>
      {
        getNavMenu()
      }
    </div>
  )
}