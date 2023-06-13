import React, {useState} from 'react';
import './Login.css'
export default function Login(){
  const [emailInput,setEmailInput] = useState('');
  const [passInput,setPassInput] = useState('');
  let handleLogin = async function(){
    await fetch('https://appxchange.herokuapp.com/api/user/login',{
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
        window.location.href = '/AppXchange/#/';
        //refresh the page so the correct nav shows
        window.location.reload();
      }
    })
  };
  return(
    <form className='login' method='POST' action='https://appxchange.herokuapp.com/api/user/login'> 
      <p>Login</p>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' value={passInput} onChange={(e)=>{setPassInput(e.target.value)}}/>
      </div>
      <button onClick={()=>handleLogin()} className='form-submit' type='button'>Log In</button>
    </form>
  )
}