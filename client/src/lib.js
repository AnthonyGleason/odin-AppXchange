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
};
export const getAndUpdateSearchResults = async function(setSearchResults,searchStr){
  let searchResults = [];
  await fetch(`http://localhost:5000/api/search/${searchStr}`,{
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
  await fetch('http://localhost:5000/api/app', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => {
      setStoreItems(data.apps);
  });
};