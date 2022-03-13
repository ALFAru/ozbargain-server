const mongoose = require("mongoose");
const { Schema } = mongoose;

const historyDealSchema = new Schema({
  id: {
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

const HistoryDeal = mongoose.model("HistoryDeal", historyDealSchema);
module.exports = HistoryDeal;
