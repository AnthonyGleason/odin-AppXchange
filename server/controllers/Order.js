const OrderModel = require('../models/Order');

const createOrder = async function(userID,appID){
  return await OrderModel.create({
    user: userID,
    appID: appID,
  });
};
const getOrderByDocID = async function(docID){
  return await OrderModel.findById(docID);
};
const getOrdersByUserDocID = async function(docID){
  return await OrderModel.find({user: docID});
}
const updateOrderByDocID = async function(docID,updatedOrder){
  return await OrderModel.findByIdAndUpdate(docID,updatedOrder);
};
const deleteOrderByDocID = async function(docID){
  return await OrderModel.findByIdAndDelete(docID)
};

module.exports = {
  createOrder,
  getOrderByDocID,
  getOrdersByUserDocID,
  updateOrderByDocID,
  deleteOrderByDocID,
}