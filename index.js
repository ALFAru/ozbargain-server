const { scrapeMain } = require("./scraper");
const { connectDB, addItems, addItemsToHistory } = require("./database/mongo");

async function run() {
  await connectDB();
  const scrapedDeals = await scrapeMain(); //scrape
  // Check if in current deals
  // updateCurrentDeals(scrapedDeals)
  // addNewDeals(scrapedDeals)
  //addItems(scrapedDeals);
  //addItemsToHistory(scrapedDeals);
}

run();
