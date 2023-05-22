import React from 'react';

export default function Register(){
  return(
    <div className='register'>
      <form method='POST' action='http://localhost:5000/api/user/register'>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input id='firstName' name='firstName' type='text' />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input id='lastName' name='lastName' type='text' />
        </div>
        <div>
          <label htmlFor='emailReg'>Email:</label>
          <input id='emailReg' name='email' type='email' />
        </div>
        <div>
          <label htmlFor='passwordReg'>Password:</label>
          <input type='password' name='password' id='passwordReg' />
        </div>
        <div>
          <label htmlFor='passwordConfirm'>Password Again:</label>
          <input type='password' name='passwordConfirm' id='passwordConfirm' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}