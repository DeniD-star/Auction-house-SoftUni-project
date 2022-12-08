const Auction = require('../models/Auction');


async function createAuction(auctionData) {
    const auction = new Auction(auctionData);

    await auction.save();
    return auction;
}

async function getAllAuctions(){
    const auctions = await Auction.find({}).lean();

    return auctions;
}

module.exports = {
    createAuction,
    getAllAuctions
}