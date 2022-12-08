const User = require('../models/User');

async function createUser(email, firstName, lastName, hashedPassword){
    const user = new User({
        email,
        firstName,
        lastName,
        hashedPassword
    })

    await user.save();
    console.log(user);
    return user;
}

// async function getUserByName(username){
//     const pattern = new RegExp(`^${username}$`, 'i')
//     const user = await User.findOne({username: {$regex: pattern}});
//     return user;
// }
async function getUserByEmail(email){
    const pattern = new RegExp(`^${email}$`, 'i')
    const user = await User.findOne({email: {$regex: pattern}});
    return user;
}

module.exports = {
    createUser,
    // getUserByUsername,
    getUserByEmail
}