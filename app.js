import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

const knex = require('knex')


const postgresDb = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'Campaigns'
  }
});
/*
postgresDb.select('*').from('Campaigns').then(data => {
  console.log(data);
})*/
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
    const {qCountry, qBudget, qGoal, qCategory} = req.query;
    // USING POSTGRESDB
    // postgresDb.select('*').from('Campaigns').where({
    //   qCountry : country,
    //   qGoal : goal,
    //   qCategory : category,
    // }) .andWhere('qBudget', '<', budget)
    // .then(campaign => {
    //   console.log(campaign);
    // })
    //USING DUMMY DATABASE
    console.log(req.body.country);
    let newCampaigns = db.filter(function (campaign) {
        
        return  (campaign.country === qCountry || qCountry === undefined) &&
                (campaign.budget >= qBudget || qBudget === undefined) &&
                (campaign.goal === qGoal || qGoal === undefined) &&
                (campaign.category === qCategory || qCategory === undefined);
        
            
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
    const { name } = req.params;
    
    // db.map((campaign) => {
    //   if (campaign.name === name) {
    //     return res.status(200).send({
    //       success: 'true',
    //       message: 'campaign retrieved successfully',
    //       campaign,
    //     });
    //   } 
  //});
   return res.status(404).send({
     success: 'false',
     message: 'campaign does not exist',
    });
});

// ADD CAMPAIGN
app.post('/api/v1/campaigns', (req, res) => {
    const {country, budget, goal, category} = req.body;
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
    "name": `n${db.length + 1}`,
    "country": country,
    "budget": budget,
    "goal": goal,
    "category": category 
   }
   // USING POSTGRESDB
  //  postgresDb.insert({
  //   name: `n${db.length + 1}`,
  //   country: country,
  //   budget: budget,
  //   goal: goal,
  //   category: category 
  //  }).then(console.log)
   //USING DUMMY DATABASE
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