const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'footprintproject.io@gmail.com', // gmail account
        pass: process.env.PASSWORD // gmail account password
    }
});

// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

/**
 * POST route
 */
router.post('/', (req, res, next) => {
    const name = req.body.content.name
    const email = req.body.content.email
    const message = req.body.content.message
    const content = `name: ${name} \n 
      email: ${email} \n 
      message: ${message} \n 
      siteName: ${req.body.siteName} \n
      address: ${req.body.address} \n
      fundStartDate: ${req.body.fundStartDate}, \n
      fundEndDate: ${req.body.fundEndDate}, \n
      location: ${JSON.stringify(req.body.location)}, \n
      generator: ${JSON.stringify(req.body.generator)}, \n
      selectedSite: ${req.body.selectedSite}, \n
      totalDieselCost: $${req.body.totalDieselCost.toLocaleString()}`
  
    const mail = {
      from: name,
      to: 'footprintproject.io@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'Solar Estimate',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

module.exports = router;