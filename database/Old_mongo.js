const mongoose = require("mongoose");
const Deal = require("./Deal");

const db_url = "mongodb://localhost/ozbargain";

async function unpublishDealDB(deal) {
  const test = await Deal.findByIdAndUpdate(deal._id, { status: 0 });
  console.log("Deal was unpublished! " + deal._id);
}

async function finaliseDealDB(deal) {
  await Deal.findByIdAndUpdate(deal._id, { status: 2 });
  console.log("Deal was finalised!!!!!!!!!!!! --- " + deal._id + " ---");
}

async function insertDataDealDB(deal) {
  let dealObj = { ...deal };
  delete dealObj._id;
  await Deal.findByIdAndUpdate(deal._id, dealObj);
}

async function enterNewActiveDealDB(deal) {
  const newDeal = new Deal(deal);
  await newDeal.save();
  console.log("New Deal added to DB: " + deal._id);
  console.log(deal);
}

async function enterCurentAsInactive(deals) {
  deals.forEach(async (element) => {
    const result = await dealExist(element._id);
    console.log(result);
    if (!result) {
      const dealObj = { ...element, status: 0 };
      const newDeal = new Deal(dealObj);
      await newDeal.save();
      console.log("Deal added as inactive: " + dealObj._id);
      console.log(dealObj);
    }
  });
}

async function dealExist(id) {
  const results = await Deal.findById(id);
  if (results === null) {
    return false;
  } else {
    return true;
  }
}

async function killActiveDeals() {
  // Set all active deals with status 1 to status 0
  const entries = await Deal.find({ status: 1 });
  entries.forEach(async (element) => {
    await Deal.findByIdAndUpdate(element._id, { status: 0 });
    console.log("Active deal killed! " + element._id);
  });
}

async function connectDB() {
  await mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
}

module.exports = {
  connectDB,
  insertDataDealDB,
  enterNewActiveDealDB,
  finaliseDealDB,
  enterCurentAsInactive,
  dealExist,
  unpublishDealDB,
  killActiveDeals,
};
