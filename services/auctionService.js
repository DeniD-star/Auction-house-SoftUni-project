const Auction = require('../models/Auction');
const User = require('../models/User');


async function createAuction(auctionData) {
    const auction = new Auction(auctionData);

    await auction.save();
    return auction;
}

async function getAllAuctions() {
    const auctions = await Auction.find({}).lean();

    return auctions;
}
async function getAuctionById(id) {
    const auction = await Auction.findById(id).lean();

    return auction;
}


async function editAuction(auctionId, newAuction) {
    const auction = await Auction.findById(auctionId);
    auction.title = newAuction.title
    auction.description = newAuction.description
    auction.category = newAuction.category
    auction.imageUrl = newAuction.imageUrl
    auction.startingPrice = Number(newAuction.startingPrice)

   
    return auction.save();

}

async function deleteAuction(id){
   return Auction.findByIdAndDelete(id)
}

async function bidAuction(auctionId, userId){
    const user = await User.findById(userId);
    const auction = await Auction.findById(auctionId);

    if (auction.owner == user._id) {
        throw new Error('Cannot bid your own auction!');
    }
 

    auction.bidder.push(user);
    // if(user.amount < auction.currentAmount){
    //     throw new Error('Error!')
    // }else{
    //     auction.currentAmount = amount;
    // }

    return Promise.all([user.save(), auction.save()])
}

module.exports = {
    createAuction,
    getAllAuctions,
    getAuctionById,
    editAuction,
    deleteAuction,
    bidAuction
}