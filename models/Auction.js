const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, minLength: [4, 'Title must be at least 4 characters long!'] },
    description: { type: String, required: [true, 'Description is required!'], maxLength: [200, 'Description cannot be more than 200 characters!'] },
    category: { type: String, required: [true, 'Category is required!'], enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other'] },
    imageUrl: { type: String, required: true },
    startingPrice: { type: Number, required: [true, 'Price is required!'], min: [0, 'Price cannot be a negative number!'] },
   owner: { type: Schema.Types.ObjectId, ref: 'User' },
    bidder: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}],

})

module.exports = model('Auction', schema);