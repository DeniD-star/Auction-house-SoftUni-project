const Auction = require('../models/Auction');


async function createAuction(auctionData) {
    const auction = new Auction(auctionData);

    await auction.save();
    return auction;
}

module.exports = {
    createAuction
}