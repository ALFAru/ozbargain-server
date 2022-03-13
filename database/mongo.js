const mongoose = require("mongoose");
const CurrentDeal = require("./schemas/Deal");
const HistoryDeal = require("./schemas/HistoryDeal");

const db_url = "mongodb://localhost/ozbargain";

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
};
