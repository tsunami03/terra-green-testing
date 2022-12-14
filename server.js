const express = require("express");
const app = express()
const port = process.env.PORT || 5000;


require("dotenv").config();
const path = require("path");

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: false}));

const nodemailer = require("nodemailer");
const { triggerAsyncId } = require("async_hooks");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "terra.green.campaign@gmail.com",
        pass: "hpqcaflbvxjnbouk"
        
    }
})

// transporter.verify(({error, success})=> {
//     if(error){
//         console.log(error);
//     } else {
//         console.log("Ready for messages");
//         console.log(success);
//     }
// });

app.post("/sendmail", (req, res) => {
    const to = req.body.to;
    const mailOptions = {
        from: "terra.green.campaign@gmail.com",
        to: to,
        subject: "Pyar mohabbat dhoka hai lekin",
        html: `<br> We found love in a hopeless place (i.e, yeh bakwas college) <br> <br> <img src = "cid:unique@kreata.ee"/>`,
        attachments: [{
                filename: 'roses.jpg',
                path: 'roses.jpg',
                cid: 'unique@kreata.ee',
              }]
    }

    transporter
        .sendMail(mailOptions)
        .then(() => {
            res.json({
                status: "SUCCESS",
                message: "Message sent successfully"
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({status: "FAILED", message: "Error occurred!"});
        })
 })


 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
 })

 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 })
 