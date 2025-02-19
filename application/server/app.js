const express = require("express");
const cors = require('cors');


const port = process.env.PORT || 4000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const message = require("./routes/message");
const likes = require("./routes/likes");
const friendsRouter = require("./routes/friends");

// sessions
const sessions = require('express-session');
const mysqlStore = require('express-mysql-session')(sessions);



const app = express();

// Allow requests from the React application running on localhost:3000
const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Set credentials to true
};
app.use(cors(corsOptions));


// set up sessions options
const sessionStore = new mysqlStore({/**default options */}, require('./config/db'));
app.use(sessions({
    secret: "swe secrets",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie : {
        httpOnly: true,
        secure : false,
    }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function(req, res, next){
    //console.log(req.session);
    if (req.session.user){
      res.locals.isLoggedIn = true,
      res.locals.user = req.session.user;
      res.locals.array = [req.session.user,req.session.user];
    }
    next();
  });

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/posts", postsRouter); // route middleware from ./routes/posts.js
app.use("/comments", commentRouter);
app.use("/message", message);
app.use("/like", likes);
app.use("/friends", friendsRouter); 



/**
 * if we get here, there is no resource that can be found
 * past this point
 */
app.use((req, res) => {
    res.json({
        status: 404,
    });
});



app.listen(port, () => {
    console.log(`server listening on ${port}`);
});


module.exports = app;
