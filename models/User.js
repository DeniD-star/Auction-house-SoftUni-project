const {Schema, model} = require('mongoose');

const schema = new Schema({
    email:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    hashedPassword: {type: String, required: true},
    userAmount: {type: Number}
})

module.exports = model('User', schema);