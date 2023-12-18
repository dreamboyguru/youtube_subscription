const express = require('express');
const app = express()
const Subscriber = require('./models/subscribers')
app.use(express.static('../src'));
const path = require('path');

// Display Guide page in by default path
app.get('/', (req, res)=> {
  const index = path.join(__dirname, '/', '../src', 'guide.html' );
  res.sendFile(index);
});

// Display an array of all subscribers
app.get("/subscribers", async(req, res, next) =>{
    try {
        let subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
});

// Display an array of all subscribers with only two feilds (name and subscribed channel).
app.get("/subscribers/names", async(req, res, next) =>{
    try {
        const subscribers = await Subscriber
        .find()
        .select("-_id -subscribedDate -__v");
        res.status(200).json(subscribers);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
});

// Display the details of the particular subscriber using given ID
app.get("/subscribers/:id", async( req, res) =>{
   
    try {
        let id = req.params.id;
        let subscribers = await Subscriber.findById(id);
        res.status(200).json(subscribers);
    }
    catch (error) {
        res.status(400).json({ error: 'Subscriber ID does not exist' }); // error msg when the user entered wrong id
    }
});

module.exports = app;
