const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
//setup port
const port = 8000;

//setup static files folder
app.use(express.static('./assets'))

//setup express layouts
app.use(expressLayouts);

app.use(cookieParser());

app.use(express.urlencoded());

//put scripts and styles from pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup express router
app.use('/', require('./routes/index_router.js'));

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//listener to the defined port
app.listen(port, (err)=>{
    if(err){
        console.log(`bhai mere error hai ${err}`);
        return;
    }
    console.log(`server is up and running at port ${port}`);
});