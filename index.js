const { scrapeMain } = require("./scraper");
const {
  connectDB,
  addItems,
  addItemsToHistory,
  getCurrentDeals,
} = require("./database/mongo");
const { updateCurrentDeals, getNewDeals } = require("./processData");

async function run() {
  await connectDB();
  let scrapedDeals = await scrapeMain(); //scrape
  let currentDeals = await getCurrentDeals(); //current deals from db
  //
  await updateCurrentDeals(scrapedDeals, currentDeals);
  await getNewDeals(scrapedDeals, currentDeals);
  // addNewDeals(scrapedDeals)
  //addItems(scrapedDeals);
  //addItemsToHistory(scrapedDeals);
}

run();
