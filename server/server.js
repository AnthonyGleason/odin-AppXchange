require('dotenv').config();
const express = require('express');
const { getAllApps, findAppByName, getAppByDocID } = require('./controllers/App');
const { getOrdersByUserDocID } = require('./controllers/Order');
const { getUserByDocID, updateUserByDocID } = require('./controllers/User');
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors())

let authenticateToken = function(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  if (token == null) res.status(401);
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
    if (err) res.status(403);
    req.payload = payload;
    next();
  });
};
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL).then(()=>{
  console.log('Succesfully connected to the mongodb database.')
});

app.use(express.json());
const bcrypt = require('bcrypt');

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
app.get('/api/apps/:id',async (req,res,next)=>{
  const id = req.params.id;
  res.json({app: await getAppByDocID(id)})
})

//create a new user
app.post('/api/user/register',async (req,res,next)=>{
  const salt = bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password,salt);
  const user = await createUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashedPass,
  );
  res.json({message: `Successfully created a user with docID ${user._id}`});
});

//login user
app.post('/api/user/login',async (req,res,next)=>{
  const user = await getUserByEmail(req.body.email);
  if (await bcrypt.compare(req.body.password,user.password)){
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
    res.status(200).json({token: token});
  }else{
    res.status(401);
  }
});
    //authenticated routes//

//update user account settings
app.put('/api/user/settings',authenticateToken, async (req,res,next)=>{
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
app.get('/api/user/purchases',authenticateToken,async (req,res,next)=>{
  const id = req.payload._id;
  res.json({purchases: await getOrdersByUserDocID(id)});
});
//add to wishlist
app.put('/api/user/wishlist/:id',authenticateToken,async (req,res,next)=>{
  const userID = req.payload._id;
  const appID = req.params.id;
  let user = await getUserByDocID(userID);
  if (!user.wishlist.includes(appID)) user.wishlist.push(appID);
  await updateUserByDocID(userID,user);
  res.status(200).json({message: "User's wishlist successfully updated"});
});
//remove from wishlist
app.delete('/api/user/wishlist/:id',authenticateToken, async(req,res,next)=>{
  const userID = req.payload._id;
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
