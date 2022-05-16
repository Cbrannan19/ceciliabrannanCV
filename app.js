const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get("/", function(req, res){
  res.render("home");
});

app.get("/coding", function(req, res){
  res.render("coding");
});

app.get("/sample", function(req, res){
  res.render("sample");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post('/send', (req, res) => {
  const output = `
  <p>New Contact Request</p>
  <h3>Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>email: ${req.body.email}</li>
  <li>phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
    `;
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cecejbrannan@gmail.com", // generated ethereal user
      pass: "mvevvlylxwtfluwq", // generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Nodemailer contact" <cecejbrannan@gmail.com>', // sender address
    to: "cecejbrannan@gmail.com", // list of receivers
    subject: "New Contact Cece", // Subject line
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      return console.log(error);
    }
    console.log("message sent %s", info.messageId)

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('contact', {layout: false, msg: "email has been sent"});
  })
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`sample-expressjs app listening on port ${port}!`));
