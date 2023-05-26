import React from 'react';
import '../../styles/Footer.css';
import linkedinIMG from '../../assets/appimgs/linkedin.svg';
import githubIMG from '../../assets/appimgs/github.svg';
import mailIMG from '../../assets/appimgs/mail.svg';

export default function Footer(){
  return(
    <div className='footer'>
      <p className='yellow'>This website is solely for demonstrational purposes. No actual app content is hosted on this site and you will not be charged for any purchases made.</p>
      <p>If you would like your app removed from this site please email me below.</p>
      <div className='contact'>
        <img onClick={()=>{window.location.href='https://github.com/antinf'}} src={githubIMG} />
        <img onClick={()=>{window.location.href='https://www.linkedin.com/in/anthony-infortunio-872645220'}} src={linkedinIMG} />
        <img onClick={()=>{window.location.href='mailto:contact@anthonyinfortun.io'}} src={mailIMG} />
      </div>
    </div>
  )
}