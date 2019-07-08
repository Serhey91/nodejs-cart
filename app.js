const express = require('express');
const app = express(); //creating express application
//setting a global configuration value
const path = require('path');
const {
    getErrorPage
} = require('./controllers/404')

//connecting for DB
const dbSequelize = require('./helpers/database');


// view engine - using some package
//views - all html pages for showing

app.set('view engine', 'ejs');
app.set('views', 'views');

//DATABASE

//selecting all products
// db.execute('SELECT * FROM products')
// .then(data => console.log(data[0]))
// .catch(err => console.log(err))


//db.end() //when app is shutting down
//DATABASE

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const PORT = 3333;

app.use(express.urlencoded({
    extended: true
})); //sending via command line
app.use(express.static(path.join(__dirname, 'public'))); //for static files in system
//connecting routes for app
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

//define all models in app and compare it with DB. If there is no DB - it creates 
// tables and creates relations, if yes - creates relations
dbSequelize.sync()
    .then(data => {
        app.listen(PORT, () => console.log(`Connecting to port ${PORT}`));
    })
    .catch(err => console.log(err))

