const axios = require("axios");
const cheerio = require("cheerio");

const main_url = "https://www.ozbargain.com.au/deals";

async function scrapeMain() {
  try {
    const results = await axios.get(main_url).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log("scrapeMain Server error 1");
        return -1;
      } else if (error.request) {
        // The request was made but no response was received
        console.log("scrapeMain Server error 2");
        return -1;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("scrapeMain Server error 3");
        return -1;
      }
    });

    const { data } = results;

    const $ = cheerio.load(data);
    const table = $("body");
    const deals = [];

    table.find(".node-ozbdeal").each((i, element) => {
      const $element = $(element); //turn element in to jQuery
      const deal = {};
      const re = /\d+/g;
      const usersElement = table.find(".fa-users");
      const $footer = $(usersElement);

      const dealId = $element.find("h2").attr("id");
      if (dealId !== "") {
        const idStr = dealId.match(re)[0];
        deal._id = parseInt(idStr);
        deal.name = $element.find("h2").text();
        const comments = $element.find(".fa-comment").parent().text().trim();
        deal.comments = parseInt(comments);
        const cat = $element.find(".fa-tag").next().attr("href");
        deal.category = cat.slice(5);
        const likes = $element.find(".fa-plus").next().text();
        deal.likes = parseInt(likes);

        let users = $footer.next().text();
        usersNum = parseInt(users.replace(",", ""));
        let guests = $footer.next().next().text();
        guestsNum = parseInt(guests.replace(",", ""));
        deal.online = usersNum + guestsNum;
        deal.lifeTime = 0;
        deal.score = deal.comments + deal.likes;

        deals.push(deal);
      }
    });

    return deals;
  } catch (error) {
    console.error(error);
    console.log("scrapeMain is Catched and returning -1");
    return -1;
  }
}

module.exports = { scrapeMain };
