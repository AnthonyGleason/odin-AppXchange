const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}`);
});

//buy an app for a user with checkout form data
//get all apps
//get apps by an inputted search
//get all purchases for a user
//toggle wishlist app for a user
//update user account settings