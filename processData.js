const {
  getDeals,
  deleteDeal,
  updateDeal,
  addDeal,
  addDealHistory,
  existInHistory,
} = require("./database/mongo");

async function getNewDeals(scrapedDeals, currentDeals) {
  scrapedDeals.forEach(async (sDeal) => {
    let currentDeal = currentDeals.find((cDeal) => cDeal._id === sDeal._id);

    if (!currentDeal) {
      let bool = await existInHistory(sDeal._id);
      if (!bool) {
        let fixedDeal = updateScoreTime(sDeal);
        await addDeal(fixedDeal);
        await addDealHistory(fixedDeal);
      }
    }
  });
}

async function updateCurrentDeals(scrapedDeals, currentDeals) {
  currentDeals.forEach(async (cDeal) => {
    let scrapedDeal = scrapedDeals.find((sDeal) => sDeal._id === cDeal._id);
    // delete items that no longer on the website
    if (!scrapedDeal) await deleteDeal(cDeal._id);
    else {
      let fixedDeal = updateScoreTime(scrapedDeal, cDeal.lifeTime);
      if (fixedDeal.lifeTime >= 61) await deleteDeal(fixedDeal._id);
      else {
        await updateDeal(fixedDeal);
        await addDealHistory(fixedDeal);
      }
    }
  });
}

function updateScoreTime(deal, lifeTime = 0) {
  deal.score = deal.likes + deal.comments;
  deal.lifeTime = lifeTime + 1;
  return deal;
}

async function getCurrentDeals() {
  return await getDeals();
}

module.exports = {
  updateCurrentDeals,
  getNewDeals,
  getCurrentDeals,
};
