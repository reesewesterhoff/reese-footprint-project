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
    const subject = req.body.content.subject
    const content = `User's Name: ${name} \n 
      User's email: ${email} \n 
      Message: ${message} \n 
      Site Name: ${req.body.siteName} \n
      Address: ${req.body.address} \n
      Funding Start Date: ${req.body.fundStartDate}, \n
      Funding End Date: ${req.body.fundEndDate}, \n
      GPS Location: Lat: ${req.body.location.lat} Lon: ${req.body.location.lng}, \n
      Generator(s)/Energy Budget: ${req.body.generator.generatorSize}${req.body.generator.energyUnit} $${req.body.generator.monthlyCost}, \n
      Selected Site Type: ${req.body.selectedSite}, \n
      Total Diesel Cost over Project Timeline: $${req.body.totalDieselCost.toLocaleString()}`
  
    const mail = {
      from: name,
      to: 'footprintproject.io@gmail.com',  //Change to email address that you want to receive messages on
      subject: subject,
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