const express = require('express');
const app = express(); //creating express application
//setting a global configuration value
const path = require('path');
const { getErrorPage } = require('./controllers/404')

// view engine - using some package
//views - all html pages for showing

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const PORT = 3333;

app.use(express.urlencoded({extended: true}));//sending via command line
app.use(express.static(path.join(__dirname, 'public'))); //for static files in system
//connecting routes for app
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage)
app.listen(PORT, () => console.log(`Connecting to port ${PORT}`));