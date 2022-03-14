const { body, validationResult } = require('express-validator')

exports.validate = () => ([
    body('name').trim().escape()
        .notEmpty().withMessage("Name must not be empty")
        .isLength({
            min: 3,
            max: 70
        }).withMessage("Minimum and maximum length of name is 3 and 70 characters"),

    body('email').trim().escape()
        .notEmpty().withMessage("Email must not be empty")
        .isEmail().withMessage("Invalid email address format").normalizeEmail()
        .isLength({ max: 70 }).withMessage("Maximum length of email is 70 characters"),

    body('telp').trim().escape()
        .notEmpty().withMessage("Telp must not be empty")
        .isNumeric().withMessage("Telp must be a number")
        .isLength({
            min: 11,
            max: 15
        }).withMessage("Minimum and maximum length of telp is 11 and 15 characters")
])

exports.validator = (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
        return msg
    })

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped(),
            message: "Invalid data"
        });
    }

    next()
}