const { isUser } = require('../middlewares/guards');
const userService = require('../services/userService');

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
        res.redirect('/auctions/catalog')
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

router.get('/details/:id', async(req, res)=>{
    try {
        
        const auction = await req.storage.getAuctionById(req.params.id);
        const user = await userService.getUserByEmail(req.user.email)
        const currentAmount = Number(user.userAmount)
        auction.hasUser = Boolean(req.user)
        auction.isOwner = req.user && req.user._id == auction.owner;
        auction.isBidder = req.user && auction.bidder.find(x => x == req.user._id);
       
        auction.isHighestBidder = auction.currentUserAmount;
        
        

        if(auction.isOwner){
            res.render('details-owner', {auction})
        }else{
            res.render('details', {auction})
           
        }
       
    } catch (err) {
        console.log(err.message);
        res.redirect('/auctions/404');
    }
})

router.get('/404', (req, res)=>{
    res.render('404')
})
router.get('/edit/:id', isUser(), async(req, res)=>{
    try {
        const auction = await req.storage.getAuctionById(req.params.id);

    if(auction.owner != req.user._id){
        throw new Error('You cannot edit an auction that you are not owner!')
    }

    res.render('edit', {auction})
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }
})
router.post('/edit/:id', isUser(), async(req, res)=>{
    try {
        const auction = await req.storage.getAuctionById(req.params.id);

        if(auction.owner != req.user._id){
            throw new Error('You cannot edit an auction that you are not owner!')
        }

        await req.storage.editAuction(req.params.id, req.body)
        res.redirect('/auctions/catalog')
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message]
        }

        const ctx = {
            errors,
            auction: {
                _id: req.params.id,//tuk da ne zabravq pri edit post da dobavq id to na hotela
                //tuk da ne zabravq pri edit post da dobavq id to na hotela
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                imageUrl: req.body.imageUrl,
                startingPrice: Number(req.body.startingPrice),
                
            }
        }

        res.render('edit', ctx)
    }
})

router.get('/delete/:id', isUser(), async(req, res)=>{
    try {

        const auction = await req.storage.deleteAuction(req.params.id);
        if(auction.owner != req.user._id){
            throw new Error('You cannot delete an auction that you are not owner!')
        }

    
        res.redirect('/auctions/catalog')
    } catch (err) {
        console.log(err.message);
        res.redirect('/auctions/details/' + req.params.id)
    }
})

router.post('/bid/:id', isUser(), async(req, res)=>{
    try {
        const auction = await req.storage.bidAuction(req.params.id, req.user._id);
        const user = await userService.getUserByEmail(req.user.email);
       
    //     const amount = {
    //         amount: Number(req.user.amount)
    //     }
    //    if(amount.amount < auction.currentAmount){
    //        throw new Error('Error!')
    //    }else{
    //        auction.currentAmount = amount;
    
    //    }
        res.redirect('/auctions/details/' + req.params.id)
    } catch (err) {
        console.log(err.message);
        res.redirect('/auctions/details/' + req.params.id)
    }
})
module.exports = router;