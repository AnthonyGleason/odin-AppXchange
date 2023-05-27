const express = require('express');
const router = express.Router();
//setup stripe using the secret key in .env
const stripe = require('stripe')(process.env.STRIPE_SECRET);
//json web token will be used to authenticate users using sessions
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = function(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (token == null) res.status(401);
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
    if (err) res.status(403);
    req.payload = payload;
    next();
  });
};
//import controller functions
const { getAllApps, findAppsByName, getAppByDocID, createApp } = require('../controllers/App');
const { getOrdersByUserDocID, createOrder, updateOrderByDocID } = require('../controllers/Order');
const { getUserByDocID, updateUserByDocID , getUserByEmail,createUser} = require('../controllers/User');

    //unauthenticated routes//
router.post('/app/create',async(req,res,next)=>{
  const {name,desc,publisher,category,price,imgNames} = req.body;
  try{
    const app = await createApp(name,desc,publisher,category,price,imgNames);
    res.status(200).json({'appID': app._id});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when creating an app`);
  }
})
//get all apps
router.get('/app',async (req,res,next)=>{
  try{
    const apps = await getAllApps();
    res.status(200).json({apps: apps});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting all app data`);
  }
});

//search for an app by name
router.get('/search/:query',async (req,res,next)=>{
  const query = req.params.query;
  try{
    const app = await findAppsByName(query);
    res.status(200).json({apps: app});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting apps for the search query ${query}`);
  }
});

//get information for a single app by app id
router.get('/apps/:id',async (req,res,next)=>{
  const id = req.params.id;
  try{
    const app = await getAppByDocID(id);
    res.status(200).json({app: app})
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting app data for an app with the id ${id}`);
  }
  
});

//create a new user
router.post('/user/register',async (req,res,next)=>{
  const {firstName,lastName,email,passInput,passConfInput} = req.body;
  if (passInput !== passConfInput) res.status(400).json({error: 'Passwords do not match!'});
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    const user = await createUser(
      firstName,
      lastName,
      email,
      hashedPass,
    );
    res.status(200).json({message: `Successfully created a user with docID ${user._id}`});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting app data for an app with the id ${id}`);
  }
});
  
// Login user
router.post('/user/login', async (req, res, next) => {
  let user;
  const {email,password} = req.body;
  try{
    user = await getUserByEmail(email);
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting a user with email, ${email}}`)
  }
  
  if (!user) { //no user found
    res.status(404).json({ message: `User not found with email ${email}` });
  } else if (!password) {
    res.status(400).json({ message: 'Password input is empty' });
  } else if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

  //authenticated routes//

//update user account settings
router.put('/user/settings',authenticateToken, async (req,res,next)=>{
  const id = req.payload._id;
  const {firstName,lastName,email} = req.body;
  let updatedUser;
  try{
    updatedUser = await getUserByDocID(id);
    updatedUser = {
      ...updatedUser,
      firstName,
      lastName,
      email
    };
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting a user with docID ${id}`);
  };
  
  try{
    const user = await updateUserByDocID(id,updatedUser);
    res.status(200).json({user: user});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when updating user account settings for user ${id} with email ${email}}`);
  };
});

//get purchases for a user account
router.get('/user/purchases',authenticateToken,async (req,res,next)=>{
  const id = req.payload._id;
  try{
    const purchases = await getOrdersByUserDocID(id);
    res.status(200).json({purchases: purchases});
  }catch(e){
    console.log(`Error ${e} when getting purchases for user ${id}`);
    res.status(500);
  }
  
});

//add to wishlist
router.put('/user/wishlist/:id',authenticateToken,async (req,res,next)=>{
  const userID = req.payload._id;
  const appID = req.params.id;
  let user = await getUserByDocID(userID);
  if (!user.wishlist.includes(appID)) user.wishlist.push(appID);
  await updateUserByDocID(userID,user);
  res.status(200).json({message: "User's wishlist successfully updated"});
});

//remove from wishlist
router.delete('/user/wishlist/:id',authenticateToken, async(req,res,next)=>{
  const userID = req.payload._id;
  const appID = req.params.id;
  let user;
  try{
    user = await getUserByDocID(userID);
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting a user with docID ${userID}`);
  };
  if (user.wishlist.includes(appID)) user.wishlist.splice(user.wishlist.indexOf(appID),1);
  try{
    user = await updateUserByDocID(userID,user);
    res.status(200).json({message: "User's wishlist successfully updated"});
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when updating a user with docID ${userID}`);
  }
});

//purchase an app
router.post('/apps/:id',authenticateToken,async (req,res,next)=>{
  const userID = req.payload._id;
  const appID = req.params.id;
  let app;
  try{
    user = await getUserByDocID(userID);
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting a user with docID ${userID}`);
  };
  try{
    app = await getAppByDocID(appID);
  }catch(e){
    res.status(500);
    console.log(`Error ${e} when getting app data for app ${appID}`);
  };
  //place order through stripe api
  try{
    let order = '';
    stripe.charges.create(
      {
        amount: app.price, // Amount in cents
        currency: 'usd',
        source: 'tok_visa', // Use a test card number provided by Stripe
        description: `Charged user ${userID} for a purchase of app ${appID}`,
      },
      async function(err, charge) {
        if (err) {
          console.error(err);
          res.status(400).json({error: err});
        } else {
          console.log(charge);
          order = await createOrder(userID,appID);
          res.status(200).json({order: order._id});
          //update order status to succeeded from processing
          order.status = 'Success';
          await updateOrderByDocID(order._id,order);
        }
      }
    );
    res.status(200).json({orderID: order});
  }catch(e){
    console.log(`Error ${e} when placing an order for user ${userID} for app ${appID}`);
    res.status(500).json({'error': 'An error occured during checkout you have not been charged'});
  };
});
module.exports = router;