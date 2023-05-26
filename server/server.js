//setup enviornment variables
require('dotenv').config();
//setup express app
const express = require('express');
const app = express();
const PORT = 5000;
app.listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}`);
});
//setup body parser so req.body is not undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup cors to allow connections from the client
const cors = require('cors');
app.use(cors())
//setup mongoose, connecting to the database url in .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL).then(()=>{
  console.log('Successfully connected to the mongodb database.')
});

const apiRouter = require('./routers/api');
app.use('/api',apiRouter);