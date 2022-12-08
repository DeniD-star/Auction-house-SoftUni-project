const auctionService = require('../services/auctionService')

module.exports = ()=> (req, res, next)=>{
    req.storage = {
        ...auctionService
    };
    next()
}