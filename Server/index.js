const express = require('express')
const app = express()
const Connection = require('./database/db.js')
const Routes = require('./router/route.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv  = require('dotenv')
const cartRoutes = require('./router/route.js');
const paymentRoutes = require('./router/route.js');
dotenv.config()
app.use(cors())
Connection()
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({ extended : true }))
app.use('/',Routes)
app.use('/uploads',express.static('uploads'))
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);
const PORT  = process.env.PORT

app.listen(PORT, () => console.log(`Server Running on Port Number ${PORT}`))
