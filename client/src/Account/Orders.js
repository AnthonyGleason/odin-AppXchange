import React, {useEffect,useState} from 'react';
import './Orders.css';

export default function Orders(){
  const [purchases,setPurchases] = useState([]);
  useEffect(()=>{
    getPurchases();
  },[])
  const getPurchases = async function() {
    if (!localStorage.getItem('jwt')) throw new Error('User not signed in');
    try {
      const response = await fetch(`http://localhost:5000/api/user/purchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch purchases');
      }
      const data = await response.json();
      setPurchases(data.purchases);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  return(
    <div className='orders'>
      <p className='orders-title'>My Orders</p>
      {
        purchases.map((order, index) => {
          const orderDate = new Date(order.orderDate);
          const formattedDate = orderDate.toLocaleDateString('en-US');

          return (
            <div className='order' key={index}>
              <p>Order Date: {formattedDate}</p>
              <p>Order Status: {order.status}</p>
              <p>App ID: {order.appID}</p>
            </div>
          );
        })
      }
    </div>
  )
}