const mongoose = require("mongoose");
const { Schema } = mongoose;

const currentDealSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  lifeTime: {
    type: Number,
  },
  score: {
    type: Number,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  category: {
    type: String,
  },
  online: {
    type: Number,
  },
});

const CurrentDeal = mongoose.model("CurrentDeal", currentDealSchema);
module.exports = CurrentDeal;
