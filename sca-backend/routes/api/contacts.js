const express = require('express')
const contactController = require('../../controllers/contact')
const { validate, validator } = require('../../validation/contact')

const router = express.Router()

router.get('', contactController.index)
router.post('', validate(), validator, contactController.store)
router.get('/:id', contactController.show)
router.patch('/:id', validate(), validator, contactController.update)
router.delete('/:id', contactController.destroy)

module.exports = router