const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sendMail = require("./mailer/mail");

require('dotenv').config();
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
  };


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("index.ejs")
});

app.post("/", function(req,res){
    var name = req.body.name 
    var email = req.body.email 
    var subject = req.body.subject 
    var phone = req.body.phone
    var company = req.body.company
    var message = req.body.message
    message = "Message: "+message +"\n Name: "+name+"\n Company: "+company +"\n Phone: "+phone 
    sendMail("say2yasha2000@gmail.com", subject, message, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("mail sent");
        }
    })
    sub="Thanks for contacting YASH AGARWAL!"
    body="I have recieved your message and will be reverting you back soon! \n Regards, \n Yash Agarwal \n +917060586225"
    sendMail(email, sub, body, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("mail sent");
        }
    })
    res.render("index.ejs")
})

app.listen(process.env.PORT, process.env.IP);