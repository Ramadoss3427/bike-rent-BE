const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const SerdataModel = require('./models/serdata');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://ramadoss3427:IFSPHXbGsSBGU0fo@cluster0.4yohwha.mongodb.net/');
console.log("connect to the mongodb")
app.get('/', (req, res) => {
    res.send("welcome to the bike rental portal")
})

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})
app.post('/firststep',(req, res)=>{
    const {emailid, fullname} = req.body;
    console.log("hello");
    SerdataModel.findOne({emailid: emailid})
    .then(user =>{
        if(user){
            console.log(user)
            res.json("Already registered")
        }
        else{
            SerdataModel.create(req.body)
            .then(log_ser_form => res.json(log_ser_form))
            .catch(err => res.json(err)) 
        }
    })
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});