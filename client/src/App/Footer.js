import React from 'react';
import linkedinIMG from '../assets/footer/linkedin.svg';
import githubIMG from '../assets/footer/github.svg';
import mailIMG from '../assets/footer/mail.svg';
import './Footer.css';
export default function Footer(){
  return(
    <div className='footer'>
      <p className='yellow'>This website is solely for demonstrational purposes. No actual app content is hosted on this site and you will not be charged for any purchases made.</p>
      <p>If you would like your app removed from this site please email me below.</p>
      <div className='contact'>
        <img alt='github logo' onClick={()=>{window.location.href='https://github.com/antinf'}} src={githubIMG} />
        <img alt='linkedin logo' onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220'}} src={linkedinIMG} />
        <img alt='mailing envelope' onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} src={mailIMG} />
      </div>
    </div>
  )
}