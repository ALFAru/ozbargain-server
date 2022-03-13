const mongoose = require("mongoose");
const CurrentDeal = require("./schemas/Deal");
const HistoryDeal = require("./schemas/HistoryDeal");
const db_url = "mongodb://localhost/ozbargain";

async function existInHistory(id) {
  const results = await HistoryDeal.find({ id: id });
  if (results.length > 0) return true;
  else return false;
}

async function addDealHistory(deal) {
  let dealCopy = { id: deal._id, ...deal };
  delete dealCopy._id;
  const newDeal = new HistoryDeal(dealCopy);
  await newDeal.save();
  console.log("Added History", deal._id);
}

async function addDeal(deal) {
  const newDeal = new CurrentDeal(deal);
  await newDeal.save();
  console.log("New deal added", deal._id);
}

async function updateDeal(deal) {
  await deleteDeal(deal._id);
  const newDeal = new CurrentDeal(deal);
  await newDeal.save();
}

async function deleteDeal(id) {
  await CurrentDeal.deleteOne({ _id: id });
}

async function getDeal(id) {
  return await CurrentDeal.find({ _id: id });
}

async function getDeals() {
  return await CurrentDeal.find({});
}

async function addItemsToHistory(deals) {
  deals.forEach(async (deal) => {
    const newDeal = new HistoryDeal(deal);
    await newDeal.save();
    console.log("New Deal added to DB: " + deal._id);
    console.log(deal);
  });
}

async function addItems(deals) {
  deals.forEach(async (deal) => {
    const newDeal = new CurrentDeal(deal);
    await newDeal.save();
    console.log("New Deal added to DB: " + deal._id);
    console.log(deal);
  });
}

async function connectDB() {
  await mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
}

module.exports = {
  connectDB,
  addItems,
  addItemsToHistory,
  getDeal,
  deleteDeal,
  updateDeal,
  addDeal,
  addDealHistory,
  existInHistory,
  getDeals,
};
