const AppModel = require('../models/App');

const createApp = async function(name,desc,publisher,category,price){
  return await AppModel.create({
    name: name,
    desc: desc,
    publisher: publisher,
    category: category,
    price: price,
  });
};

const getAppByDocID = async function(docID){
  return await AppModel.findById(docID);
};

const findAppByName = async function(searchStr){
  return await AppModel.find({name: searchStr});
};

const getAllApps = async function(){
  return await AppModel.find({});
};

const updateAppByDocID = async function(docID,updatedApp){
  return await AppModel.findByIdAndUpdate(docID,updatedApp);
};

const deleteAppByDocID = async function(docID){
  return await AppModel.findByIdAndDelete(docID);
};

module.exports = {
  createApp,
  getAppByDocID,
  findAppByName,
  getAllApps,
  updateAppByDocID,
  deleteAppByDocID
};