import React , {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './SearchResults.css';
import CheckoutForm from './CheckoutForm';
import { getPrice,setupCheckout,getAndUpdatePurchases, getAndUpdateSearchResults, getBackgroundImg} from '../lib';

export default function SearchResults(){
  const [searchResults,setSearchResults] = useState([]);
  const [cart,setCart] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const {query} = useParams();
  //get search results inside useEffect
  useEffect(()=>{
    getAndUpdateSearchResults(setSearchResults,query);
    getAndUpdatePurchases(setPurchases);
  },[query])
  if (searchResults){
    return(
      <div className='search-results'>
        <CheckoutForm cart={cart} />
        {
          searchResults.map((item,index)=>{
            const backgroundIMG = getBackgroundImg(item.imgNames[0]);
            return(
              <ul 
              style={{ backgroundImage: backgroundIMG,backgroundPosition: 'center'}}
              onClick={()=>setupCheckout(item.price,item._id,setCart,item.name,item.publisher,purchases)}
              className='search-result' key={index}>
                <div>
                  <li>{item.category}</li>
                  <li>{item.name}</li>
                  <li>{item.publisher}</li>
                  <li>{item.desc}</li>
                  <li>App ID: {item._id}</li>
                  {
                    getPrice(item._id,purchases,item)
                  }
                </div>
              </ul>
            )
          })
        }
      </div>
    )
  }
};