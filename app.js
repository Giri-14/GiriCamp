if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const ejsMate= require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError=require('./utils/ExpressError')
const path=require('path');
const campgroundRoutes = require('./routes/campground.js')
const reviewRoutes = require('./routes/reviews.js')
const userRoutes = require('./routes/users.js')
const session = require('express-session');
const flash = require('connect-flash');
const passport=require('passport');
const localStrategy = require('passport-local');
const User=require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const port = process.env.PORT;

//  -------------db 

const dbUrl =process.env.DB_URL || 'mongodb://localhost:27017/Yelp-Camp'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log("No connection", e.message);
});


const db=mongoose.connection;



const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize({
    replaceWith: '_'
}))
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
// const store = new MongoDBStore({
//     url: dbUrl,
//     secret:secret,
//     touchAfter: 24 * 60 * 60
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR", e);
// });

// const sessionConfig = {
//     store: store,  // Use the store directly
//     name: 'session',
//     secret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// };

const sessionConfig = {
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL || "mongodb://localhost:27017/Yelp-Camp",
      touchAfter: 24 * 60 * 60,
    }),
    name: "session",
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
  
  
app.use(session(sessionConfig));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if (!["/login", "/"].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
      }
    res.locals.currentUser = req.user;

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);
app.use('/',userRoutes);



// const campground = require('./models/campground');
// const { title } = require('process');


  




app.get('/',(req,res)=>{
    res.render('home')
})




                                     

app.all('*',(req,res,next)=>{
    next(new ExpressError('page not found',404))
})
app.use((err,req,res,next)=>{
    // const {statusCode =500}=err;
    // 
    // 
    const {statusCode =500 }=err;
    if(!err.message) err.message='Oh No, Something Went Wrong!'
    res.status(statusCode).render('error',{err})
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})







