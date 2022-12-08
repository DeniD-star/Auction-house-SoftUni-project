const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const auctionController = require('../controllers/auctionController');

module.exports=(app)=>{
    app.use('/auth', authController)
    app.use('/', homeController)
    app.use('/auctions', auctionController)
}