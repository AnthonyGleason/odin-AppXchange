const UserModel = require('../models/User');

const createUser = async function(firstName,lastName,email,password){
  return await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
};
const getUserByDocID = async function(docID){
  return await UserModel.findById(docID);
};
const getUserByEmail = async function(email){
  return await UserModel.findOne({email: email});
}
const getAllUsers = async function(){
  return await UserModel.find({});
};
const updateUserByDocID = async function(docID,updatedUser){
  return await UserModel.findByIdAndUpdate(docID,updatedUser);
};
const deleteUserByDocID = async function(docID){
  return await UserModel.findByIdAndDelete(docID);
};

module.exports = {
  createUser,
  getUserByDocID,
  getAllUsers,
  updateUserByDocID,
  deleteUserByDocID
}