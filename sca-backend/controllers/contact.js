const { Contact } = require('../models')

const contact = {

    index: async (req, res) => {
        try {
            const contacts = await Contact.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            res.status(200).json({
                message: "",
                contacts,
            })
        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: "Internal Server Error",
            })
        }

    },

    store: async (req, res) => {
        const inputData = { ...req.body }

        try {
            const contact = await Contact.create({
                name: inputData.name,
                email: inputData.email,
                telp: inputData.telp
            })

            res.json({
                message: "Contact created",
                contact
            })

        } catch (error) {
            console.error(error)

            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    },

    show: async (req, res) => {
        try {
            const contact = await Contact.findByPk(req.params['id'])

            res.json({
                message: "",
                contact
            })
        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    },

    update: async (req, res) => {
        const inputData = { ...req.body }

        try {
            let contact = await Contact.findByPk(req.params['id'])

            if (contact) {
                contact = await contact.update({
                    name: inputData.name,
                    email: inputData.email,
                    telp: inputData.telp
                })
            }

            res.json({
                message: "Contact updated",
                contact
            })

        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    },

    destroy: async (req, res) => {
        try {
            const contact = await Contact.findByPk(req.params['id'])

            if (contact) {
                await contact.destroy()
            }

            res.json({
                message: "Contact deleted",
            })
        } catch (error) {
            console.log(error)

            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }

}

module.exports = contact
