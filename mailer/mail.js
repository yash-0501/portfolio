const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yash.agarwal.dev@gmail.com',
      pass: process.env.pass
    }
  });

const Mail = (email, subject, text, cb) => {
    let mailOptions = {
        from: "yash.agarwal.dev@gmail.com",
        to: email,
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailOptions, (err,data)=>{
        if(err){
            cb(err, null);
        } else{
            cb(err, null);
        }
    })
}

module.exports = Mail;
