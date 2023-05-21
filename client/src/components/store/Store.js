import React, { useEffect, useState } from 'react';
import '../../styles/StoreItem.css';
import minecraft1 from '../../assets/appimgs/minecraft1.jpg';

export default function Store() {
  const [storeItems, setStoreItems] = useState([]);

  const getStoreItems = async function () {
    await fetch('http://localhost:5000/api/app', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setStoreItems(data.apps);
      });
  };

  useEffect(() => {
    getStoreItems();
  }, []);

  return (
    <div className='store'>
      {storeItems.map((item, index) => {
        let backgroundIMG = '';
        switch (item.imgNames[0]) {
          case 'minecraft1':
            backgroundIMG = `url(${minecraft1})`;
            break;
          default:
            break;
        }
        return (
          <div
            onClick={()=>{window.location.href=`./app/${item._id}`}}
            key={index}
            className='store-item'
            style={{ backgroundImage: backgroundIMG }}
          >
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price / 100}</p>
          </div>
        );
      })}
    </div>
  );
}
