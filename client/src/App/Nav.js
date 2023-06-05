import React, {useState} from 'react';
import NavMenu from './NavMenu';
import searchIMG from '../assets/widgets/search.svg';
import './Nav.css';

export default function Nav(){
  const [searchInput,setSearchInput] = useState('');
  return(
    <nav className='nav'>
      <a className='nav-logo' href='/'>AppXchange</a>
      <form method='GET' className='search'>
        <img alt='magnifying glass' className='search-logo' src={searchIMG} onClick={() => { handleSearch(searchInput) }} />
        <input onKeyDown={(e)=>{
          if (e.key==='Enter'){
            //prevent the default action of submitting the form when the enter key is pressed
            e.preventDefault();
            handleSearch(searchInput);
          }
          }} value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} />
      </form>
      <NavMenu />
    </nav>
  )
}

const handleSearch = function(inputFieldContent){
  //invalid search cases
  if (!inputFieldContent || inputFieldContent==='') return 0;
  window.location.href=`/search/${inputFieldContent}`;
}