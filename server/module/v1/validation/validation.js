const { body } = require('express-validator');

const signupValidation = [
    body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),

    body('email').isEmail().withMessage('Invalid email address'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // body('confirmPassword').custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //         throw new Error('Passwords do not match');
    //     }
    //     return true;
    // })
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

module.exports = { signupValidation, loginValidation };
