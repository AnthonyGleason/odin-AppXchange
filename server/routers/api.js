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
const { getAllApps, findAppByName, getAppByDocID, createApp } = require('../controllers/App');
const { getOrdersByUserDocID, createOrder, updateOrderByDocID } = require('../controllers/Order');
const { getUserByDocID, updateUserByDocID , getUserByEmail,createUser} = require('../controllers/User');

    //unauthenticated routes//
router.post('/app/create',async(req,res,next)=>{
  const {name,desc,publisher,category,price,imgNames} = req.body;
  try{
    const app = await createApp(name,desc,publisher,category,price,imgNames);
    res.status(200).json({'appID': app._id});
  }catch(e){
    res.status(500).json({'message': 'an internal server error occured please try again later.'});
    console.log(`Error ${e} when creating an app`);
  }
})
//get all apps
router.get('/app',async (req,res,next)=>{
  try{
    
  }catch(e){
    
  }
  res.status(200).json({apps: await getAllApps()});
});

//search for an app by name
router.get('/search/:name',async (req,res,next)=>{
  const name = req.params.name;
  res.status(200).json({apps: await findAppByName(name)});
});

//get information for a single app by app id
router.get('/apps/:id',async (req,res,next)=>{
  const id = req.params.id;
  res.status(200).json({app: await getAppByDocID(id)})
})

//create a new user
router.post('/user/register',async (req,res,next)=>{
  if (req.body.password!==req.body.passwordConfirm) res.json({error: 'Passwords do not match!'});
  console.log(req.body.password);
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password,salt);
  const user = await createUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashedPass,
  );
  res.json({message: `Successfully created a user with docID ${user._id}`});
});
  
// Login user
router.post('/user/login', async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    res.status(404).json({ message: `User not found with email ${req.body.email}` });
  } else if (!req.body.password) {
    res.status(400).json({ message: 'Password input is empty' });
  } else if (await bcrypt.compare(req.body.password, user.password)) {
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
router.get('/user/purchases',authenticateToken,async (req,res,next)=>{
  const id = req.payload._id;
  res.json({purchases: await getOrdersByUserDocID(id)});
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
  let user = await getUserByDocID(userID);
  if (user.wishlist.includes(appID)) user.wishlist.splice(user.wishlist.indexOf(appID),1);
  await updateUserByDocID(userID,user);
  res.status(200).json({message: "User's wishlist successfully updated"});
});

//purchase an app
router.post('/apps/:id',authenticateToken,async (req,res,next)=>{
  const userID = req.payload._id;
  const appID = req.params.id;
  const app = await getAppByDocID(appID);
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
});
module.exports = router;