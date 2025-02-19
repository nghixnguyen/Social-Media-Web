const request = require('supertest');
var db = require("../config/db");
// sessions
// const sessions = require('express-session');
// const mysqlStore = require('express-mysql-session')(sessions);


//const expect = require("chai").expect;

// const express = require('express');
// const app = new express();
//app.use(express.json()); // Enable parsing of JSON bodies
const app = require("../app");

//const indexRouter = require("../routes/index");
const { describe } = require('node:test');
//const {isLoggedIn,checkEmail,checkLogin,checkSignup,checkEmailUniqueness} = require("../middlewares/auth");
//const exp = require('constants');
const { doesNotReject } = require('assert');

// const sessionStore = new mysqlStore({/**default options */}, require('../config/db'));

// app.use(sessions({
//     secret: "swe secrets",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie : {
//         httpOnly: true,
//         secure : false,
//     }
// }));

// app.use('/', indexRouter);


/**
 * unit testing for sign up
 */
describe('Test sign up', () => {
    //let server;
    // beforeAll(done => {
    //     // Start the server before all tests
    //     server = app.listen(4000, () => {
    //       done();
    //     });
    // });


    /**
     * test test checkEmailUniqueness
     */


    /**
     * test for already registered email
     */
    test ('should returns false registered ', async () => {
        let response = await request(app).post('/signup').send({email : 'JohnDoe@sfsu.edu'});
        const { isRegistered} = response.body;
        console.log(response.body);
        expect(isRegistered).toBe(false);
        
    });

    /**
     * test for new email
     */
    test('continue to next handle after checking for uniqueness of email', async () => {
        let response = await request(app).post('/signup').send({email : 'hello@sfsu.edu'});
        //console.log(response.status);
        expect(response.status).toBe(200);
    });


    /**
     * test for checkSignup
     */

    /**
     * test for inserting sign up data to database
     */
    test('insert data into database and return false for already existing email', async () => {
        let response = await request(app).post('/signup').send({email : 'JohnDoe@sfsu.edu'});
        //console.log(response.status);
        expect(response.body.isRegistered).toBe(false);
    });

    test('insert data into database and return false for already existing email', async () => {
        let response = await request(app).post('/signup').send({email : 'hello@sfsu.edu'});
        //console.log(response.status);
        expect(response.status).toBe(200);
    });


    /**
     * finally test for the end point 
     */
    test('the /signup api has been successfully called and returned successful registration', async () => {
        let response = await request(app).post('/signup').send({fName : 'hello',
        lName : 'there',
        email : 'hello@sfsu.edu',
        password: 'test'});
        expect(response.body.isRegistered).toBe(true);
        await db.execute(
            `DELETE  from csc648db.RegisteredUser where Email=?`,["hello@sfsu.edu"]);

    });


    
    // afterAll(done => {
    // // Close the server after all tests are done
    //     server.close(() => {
    //         //console.log('Server closed.');
    //         done();
    //     });
    // });
});

/**
 * test log in
 */
describe("Test log in feature", () => {
    //let server1;
    //const agent = request(app);
    //let cookies;
    // beforeAll(done => {
    //     // Start the server before all tests
    //     server1 = app.listen(4001, () => {
    //       done();
    //     });
        
    // });

    // test('test testlog', async () => {
    //     const loginResponse = await request(app)
    //   .post('/testLogin')
    //   .send({ email: 'user', password: 'pass' });

    // expect(loginResponse.status).toBe(200);
    // });


//     console.log("log me something");
    
//     test('test testlogin', (done) => {
// agent.post("/testlogin").expect(200, (err, res) => {
//         if (err) return done(err);
//         expect(res.headers).to.have.property("set-cookie");
//         cookies = res.headers["set-cookie"].pop().split(";")[0];
//         console.log(cookies);
//         done();
//         });

//     console.log(agent);
//     console.log(cookies);
//     })



/**
 * test check email
 */
test('test for email not from sfsu', async () => {
    let response = await request(app).post('/login').send({email : 'test@gmail.com'});
    // console.log(response.body);
    expect(response.body.validEmail).toBe(false);
    expect(response.body.emailExist).toBe(false);
});

test('test for email from sfsu', async () => {
    let response = await request(app).post('/login').send({email : 'test@gmail.com'});
    expect(response.status).toBe(200);
});


/**
 * Once email has been checked now we log in
 */

test('test for incorrect password', async () => {
    let response = await request(app).post('/login').send({email: 'JohnDoe@sfsu.edu', password : 'wrongPassword'});
    //console.log(response.body);
    expect(response.body.validPassword).toBe(false);
    expect(response.body.isLoggedIn).toBe(false);
    expect(response.body.validEmail).toBe(true);
    expect(response.body.emailExist).toBe(true);
});


  

test('test for correct password', async () => { 
    const req = request(app);
    let response = (await req.post('/login').send({email: 'JohnDoe@sfsu.edu', password : 'password1'}));
    
    console.log(response.text);
    //expect(req.session.user).toBeDefined();
    expect(response.status).toBe(200);
});

/**
 * end point /login test
 */

test('test returning logged in statuts from /login endpoint', async () => {
    let response = await request(app).post('/login').send({email: 'JohnDoe@sfsu.edu', password : 'password1'});
    console.log(response.status);
    expect(response.body.isLoggedIn).toBe(true);
});


// afterAll(done => {
//     // Close the server after all tests are done
//         server1.close(() => {
//           //  console.log('Server closed.');
//             done();
//         });
//     });
});

describe('Test search for user feature', () => {


    test('test search for nonexistent user', async () => {
        let response = await request(app).get('/search').query({firstName : "not", lastName: "found"});
        expect(response.body.searchedUserFound).toBe(false);
    });

    test('test search for nonexistent user', async () => {
        let response = await request(app).get('/search').query({firstName : "John", lastName: "Doe"});
        expect(response.body.searchedUserFound).toBe(true);
    });
});