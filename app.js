const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      passportLocal = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverride = require("method-override"),
      user = require("./models/user"),
      card = require("./models/bountyLeaflet"),
      flash = require('connect-flash'),
      seedDB = require("./seeds"),
      indexRoutes = require("./routes/index"),
      cardRoutes = require("./routes/bountyLeaflet"),
      commentRoutes = require("./routes/comments");

const app = express();

mongoose.set("useUnifiedTopology",true);
mongoose.connect('mongodb://localhost:27017/one_peice', {useNewUrlParser: true});
mongoose.set("useCreateIndex",true);
mongoose.set("useFindAndModify",false);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(flash());
app.use(methodOverride("_method"));
//seedDB();

app.use(require("express-session")({
    secret: 'css227',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use("/",indexRoutes);
app.use("/BountyLeaflet",cardRoutes);
app.use("/BountyLeaflet/:id/comment",commentRoutes);

app.listen(3000,function(){
    console.log('Server is started');
});
