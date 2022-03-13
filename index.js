const { scrapeMain } = require("./scraper");
const { connectDB } = require("./database/mongo");
const {
  updateCurrentDeals,
  getNewDeals,
  getCurrentDeals,
} = require("./processData");

async function run() {
  await connectDB();
  let scrapedDeals = await scrapeMain(); //scrape
  let currentDeals = await getCurrentDeals(); //current deals from db
  //
  await updateCurrentDeals(scrapedDeals, currentDeals);
  await getNewDeals(scrapedDeals, currentDeals);
}

run();
