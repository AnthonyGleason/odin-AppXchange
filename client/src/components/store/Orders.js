import React, {useEffect,useState} from 'react';

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
      {
        purchases.map((order,index)=>{
          return(
            <div key={index}>
              <p>{order.orderDate}</p>
              <p>{order.user}</p>
              <p>{order.status}</p>
              <p>{order.appID}</p>
            </div>
          )
        })
      }
    </div>
  )
}