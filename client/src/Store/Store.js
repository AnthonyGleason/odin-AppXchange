import React,{useState,useEffect} from 'react';
import './Store.css';
import Aos from 'aos';
import "aos/dist/aos.css";
import { getAndUpdatePurchases } from '../lib';
import Popup from './Popup';
import CheckoutForm from './CheckoutForm';
import { StoreItemContainer } from './StoreItemContainer';

export default function Store(){
  const [cart,setCart] = useState({
    total: 0,
    itemID: '',
    itemName: '',
    itemAuthor: '',
  })
  const [storeItems,setStoreItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  useEffect(()=>{
    Aos.init({duration: 2000});
    getAndUpdateStoreItems(setStoreItems);
    if (localStorage.getItem('jwt')) getAndUpdatePurchases(setPurchases);
  },[]);

  return(
    <main className='store'>
      <Popup />
      <CheckoutForm cart={cart}/>
      <StoreItemContainer storeItems={storeItems} purchases={purchases} setCart={setCart}/>
    </main>
  )
};

const getAndUpdateStoreItems = async function (setStoreItems) {
  await fetch('http://localhost:5000/api/app', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setStoreItems(data.apps);
  });
};

