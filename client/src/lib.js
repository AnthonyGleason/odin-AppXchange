//app image imports
import minecraft1 from './assets/appimgs/minecraft1.jpg';
import btd61 from './assets/appimgs/btd61.jpg';
import fnaf1 from './assets/appimgs/fnaf1.jpg';
import flstudio1 from './assets/appimgs/flstudio1.jpg';
import terraria1 from './assets/appimgs/terraria1.jpg';
import dj1 from './assets/appimgs/dj1.jpg';
import wmw1 from './assets/appimgs/wmw1.jpg';
import af1 from './assets/appimgs/af1.png';
import sv1 from './assets/appimgs/sv1.jpg';

export const toggleElementVisibility = function(classStr){
  const element = document.querySelector(`.${classStr}`);
  if (!element) return 0;
  if(element.classList.contains('flex')){
    element.classList.add('hidden');
    element.classList.remove('flex');
  }else{
    element.classList.remove('hidden');
    element.classList.add('flex');
  }
};
export const ownsApp = function(appID,purchases){
  let appFound=false;
  if (!purchases) return false;
  purchases.forEach((order)=>{
    if (order.appID===appID)appFound = true;
  });
  return appFound;
};
export const getPrice = function(appID,purchases,item){
  const appFound = ownsApp(appID,purchases);
  if (appFound){
    return(
      <h5>Purchased</h5>
    )
  }else{
    return(
      <h5>${item.price / 100}</h5>
    )
  }
};
export const setupCheckout = function(itemPrice,itemID,setCart,itemName,itemAuthor,orders){
  //if item is purchased do not open checkout
  let alreadyPurchased = false;
  orders.forEach((order)=>{
    if (itemID===order.appID) alreadyPurchased = true;
  })
  if (alreadyPurchased) return 0;
  //handle checkout
  setCart({
    total: itemPrice,
    itemID: itemID,
    itemName: itemName,
    itemAuthor: itemAuthor,
  });
  if(ownsApp(itemID)){
    //item already purchased do nothing
  }else if (localStorage.getItem('jwt')){
    toggleElementVisibility('checkout');
  }else{
    toggleElementVisibility('pop-up');
  }
};
export const getAndUpdatePurchases = async function(setPurchases) {
  try {
    const response = await fetch(`https://appxchange.herokuapp.com/api/user/purchases`, {
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
};
export const getAndUpdateSearchResults = async function(setSearchResults,searchStr){
  let searchResults = [];
  await fetch(`https://appxchange.herokuapp.com/api/search/${searchStr}`,{
    method: 'GET',
  }).then((res)=>{
    return res.json();
  }).then((data)=>{
    if (data){
      searchResults=data.apps;
    }
  });
  setSearchResults(searchResults);
}
export const getAndUpdateStoreItems = async function (setStoreItems) {
  await fetch('https://appxchange.herokuapp.com/api/app', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setStoreItems(data.apps);
  });
};
export const getBackgroundImg = function(imgName){
  switch (imgName) {
    case 'minecraft1':
      return(`url(${minecraft1})`);
    case 'btd61':
      return(`url(${btd61})`);
    case 'fnaf1':
      return(`url(${fnaf1})`);
    case 'flstudio1':
      return(`url(${flstudio1})`);
    case 'terraria1':
      return(`url(${terraria1})`);
    case 'dj1':
      return(`url(${dj1})`);
    case 'wmw1':
      return(`url(${wmw1})`);
    case 'af1':
      return(`url(${af1})`);
    case 'sv1':
      return(`url(${sv1})`);
    default:
      return(`url('')`);
  }
};