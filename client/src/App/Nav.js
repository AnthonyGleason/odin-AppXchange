import React, {useState} from 'react';
import NavMenu from './NavMenu';
import searchIMG from '../assets/widgets/search.svg';
import './Nav.css';

export default function Nav(){
  const [searchInput,setSearchInput] = useState('');
  return(
    <nav className='nav'>
      <a className='nav-logo' href='/'>AppZone</a>
      <form method='GET' action={`http://localhost:5000/api/search/${searchInput}`} className='search'>
        <img alt='magnifying glass' className='search-logo' src={searchIMG} onClick={() => { document.querySelector('.search').submit(); }} />
        <input value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
      </form>
      <NavMenu />
    </nav>
  )
}