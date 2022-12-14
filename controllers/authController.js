const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards')


router.get('/register', isGuest(), (req, res) => {
    res.render('register');
})

router.post('/register',
    body('email', 'Email is required!').isEmail().withMessage('Please, enter a valid email!'),
    body('firstName', 'First name is required!').isLength({ min: 1 }).withMessage('First name must be at least 1 characters long!'),
    body('lastName', 'Last name is required!').isLength({ min: 1 }).withMessage('Last name must be at least 1 characters long!'),
    body('password', 'Password is required!').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!'),
    body('rePass', 'Repeat password, please!').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match!')
        }
        return true
    }),
    isGuest(),
    async (req, res) => {

        const { errors } = validationResult(req);
        try {

            if (errors.length > 0) {
                throw new Error(Object.values(errors).map(e => e.msg).join('\n'))
            }
            console.log(errors);
            await req.auth.register(req.body.email.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.password.trim());
            console.log(req.auth);
            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName

                }
            }


            res.render('register', ctx)
        }

    })

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
})
router.post('/login', isGuest(), async (req, res) => {

    try {

        await req.auth.login(req.body.email.trim(), req.body.password.trim());
        res.redirect('/');

    } catch (err) {

        let errors = [err.message];

        if (err.type == 'credential') {
            errors = ['Incorrect email or password!']
        }

        const ctx = {
            errors,
            userData: {
                email: req.body.email,
                // firstName: req.body.firstName, //qui nient'altro che dannite koito slujat za logvane, bez password
                // lastName: req.body.lastName

            }
        }
        console.log(err.message);
        res.render('login', ctx);
    }

})

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;