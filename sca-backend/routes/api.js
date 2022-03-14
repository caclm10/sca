const express = require('express');
const contactsRoutes = require('./api/contacts')

const router = express.Router()

router.use('/contacts', contactsRoutes)

module.exports = router