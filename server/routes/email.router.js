const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');
// const creds = require('../config/config');

// let transporter;

// let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'gzcj6it73x35sln3@ethereal.email', // generated ethereal user
//         pass: 'd33QbvJwAtbXeVQTw7' // generated ethereal password
//     }
// });

// let transporter = nodemailer.createTransport({
//     host: 'smtp.dispostable.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
// });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'footprintproject.io@gmail.com', // generated ethereal user
        pass: 'f00tpr1ntpr0ject.10' // generated ethereal password
    }
});

/*
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'gzcj6it73x35sln3@ethereal.email', // generated ethereal user
            pass: 'd33QbvJwAtbXeVQTw7' // generated ethereal password
        }
    });

});
*/


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
    var name = req.body.content.name
    var email = req.body.content.email
    var message = req.body.content.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} \n data: ${req.body.data}`
  
    var mail = {
      from: name,
      to: 'footprintproject.io@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'Solar Estimate',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

module.exports = router;