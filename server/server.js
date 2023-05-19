const express = require('express');
const { getAllApps, findAppByName, getAppByDocID } = require('./controllers/App');
const { getOrdersByUserDocID } = require('./controllers/Order');
const { getUserByDocID, updateUserByDocID } = require('./controllers/User');
const app = express();
const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}`);
});

  //unauthenticated routes//
  
//get all apps
app.get('/api/app',async (req,res,next)=>{
  res.json({apps: await getAllApps});
});

//search for an app by id
app.get('/api/search/:id',async (req,res,next)=>{
  const id = req.params.id;
  res.json({apps: await findAppByName(id)});
});
//get information for a single app by app id
app.get('/api/apps/:id',async (res,req,next)=>{
  const id = req.params.id;
  res.json({app: await getAppByDocID(id)})
})

//create a new user

//login user

    //authenticated routes//

//update user account settings
app.put('/api/user/settings',async (req,res,next)=>{
  const id = req.body.id; //change this later to get id from passport payload
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  let updatedUser = await getUserByDocID(id);
  updatedUser.firstName = firstName;
  updatedUser.lastName = lastName;
  updatedUser.email = email;
  await updateUserByDocID(id,updatedUser);
  res.status(200).json({message: "User successfully updated"});
});
//get purchases for a user account
app.get('/api/user/purchases',async (req,res,next)=>{
  const id = req.body.id; //change this later to get id from passport payload
  res.json({purchases: await getOrdersByUserDocID(id)});
});
//add to wishlist
app.put('/api/user/wishlist/:id',async (req,res,next)=>{
  const userID = req.body.id; //change this later to get id from passport payload
  const appID = req.params.id;
  let user = await getUserByDocID(userID);
  if (!user.wishlist.includes(appID)) user.wishlist.push(appID);
  await updateUserByDocID(userID,user);
  res.status(200).json({message: "User's wishlist successfully updated"});
});
//remove from wishlist
app.delete('/api/user/wishlist/:id', async(req,res,next)=>{
  const userID = req.body.id; //change this later to get id from passport payload
  const appID = req.params.id;
  let user = await getUserByDocID(userID);
  if (user.wishlist.includes(appID)) user.wishlist.splice(user.wishlist.indexOf(appID),1);
  await updateUserByDocID(userID,user);
  res.status(200).json({message: "User's wishlist successfully updated"});
});

    //not completed//

//purchase an app
app.post('/api/apps/:id',async (req,res,next)=>{
  const userID = req.body.id; //change this later to get id from passport payload
  const appID = req.params.id;
});
