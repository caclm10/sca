const express = require("express");
const apiRoutes = require('./routes/api')
const sequelize = require('./database')
const models = require('./models')

const app = express();

// app.disable('etag');
app.use(express.json())


app.get('/*', function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.use('/api', apiRoutes)

    ;
(async () => {
    await sequelize.sync();

    app.listen(8080, () => {
        console.log("Starting server on port 8080 🌟");
    })
})();
