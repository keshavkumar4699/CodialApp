const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require('connect-mongo');

//setup port
const port = 8000;

//setup static files folder
app.use(express.static("./assets"));

//setup express layouts
app.use(expressLayouts);

app.use(cookieParser());

app.use(express.urlencoded());

//put scripts and styles from pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// //mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codial",
    //TODO change the secret before deployment in production
    secret: "random",
    saveUninitialized: "false",
    cookie: {
      maxAge: 100 * 60 * 100,
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//setup express router
app.use("/", require("./routes/index_router.js"));

//listener to the defined port
app.listen(port, (err) => {
  if (err) {
    console.log(`bhai mere error hai ${err}`);
    return;
  }
  console.log(`server is up and running at port ${port}`);
});
