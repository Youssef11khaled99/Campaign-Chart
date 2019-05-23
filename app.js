import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();

const fetch = require("node-fetch");

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let country = '';
let budget = '';
let goal = '';
let category = '';

let dummyCategory = '';
    fetch('https://ngkc0vhbrl.execute-api.eu-west-1.amazonaws.com/api/?url=https://arabic.cnn.com/ ')
    .then(response => response.json() )
    .then (data => {
        dummyCategory = data.category.name
        console.log(dummyCategory);
    });

// GET ALL CAMPAIGNS
app.get('/api/v1/campaigns', (req, res) => {
    const query = req.query;
    country = query.country;
    budget = query.budget;
    goal = query.goal;
    category = query.category;
    console.log(req.body.country);
    let newCampaigns = db.filter(function (campaign) {
        
        return  (campaign.country === country || country === undefined) &&
                (campaign.budget >= budget || budget === undefined) &&
                (campaign.goal === goal || goal === undefined) &&
                (campaign.category === category || category === undefined);
        
            
    });
    // Now I need to push object to the map function and make the return dynamic
    let result = newCampaigns.map(({ country, goal }) => {
        return ({
            country: country,
            goal: goal,
        })
      }) ;
    res.status(200).send({
        success: 'true',
        message: 'campaigns retrieved successfully',
        campaign: result
    })
});

// GET A SINGLE CAMPAIGN
app.get('/api/v1/campaigns/:name', (req, res) => {
    const name = req.params.name;
    const query = req.query;
    
    db.map((campaign) => {
      if (campaign.name === name) {
        return res.status(200).send({
          success: 'true',
          message: 'campaign retrieved successfully',
          campaign,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'campaign does not exist',
    });
});

// ADD CAMPAIGN
app.post('/api/v1/campaigns', (req, res) => {
    if(!req.body.country) {
      return res.status(400).send({
        success: 'false',
        message: 'country is required'
    });
    } else if(!req.body.budget) {
      return res.status(400).send({
        success: 'false',
        message: 'budget is required'
    });
    } else if(!req.body.goal) {
      return res.status(400).send({
        success: 'false',
        message: 'goal is required'
      });
    }
   const campaign = {
    name: `n${db.length + 1}`,
    "country": req.body.country,
    "budget": req.body.budget,
    "goal": req.body.goal,
    "category": req.body.category 
   }
   db.push(campaign);
   return res.status(201).send({
     success: 'true',
     message: 'campaign added successfully',
     campaign
   })
  });


const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});