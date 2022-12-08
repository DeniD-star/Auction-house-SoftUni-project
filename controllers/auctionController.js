const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create')
})
router.post('/create', isUser(), async(req, res) => {
    try {
        const auctionData = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            startingPrice: Number(req.body.startingPrice),
            owner: req.user._id,
            bidder: []

        }

        await req.storage.createAuction(auctionData);
        res.redirect('/auction/browse')
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            auctionData: {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                startingPrice: Number(req.body.startingPrice),
            }
        }

        res.render('create', ctx)
    }
})


router.get('/catalog', async(req, res)=>{
       try {
        const auctions = await req.storage.getAllAuctions()

        res.render('browse', {auctions})
       } catch (err) {
           console.log(err.message);
       }
})
module.exports = router;