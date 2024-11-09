const express = require('express')
const router = express.Router()
router.use(express.static("public"));

let Customer = require('../models/customer');
let cid=1110;

function register(req,res){
    res.render("customer/register",{
          viewTitle: "Customer Registration Form"
      });
}

function regsub(req, res){
    let customer = new Customer();
    cid=cid+1;
    console.log(cid);
    customer.customerid = cid;
    customer.email=req.body.email;
    customer.customerpassword=req.body.customerpassword;
    customer.firstname=req.body.customername;
    customer.firstname=req.body.firstname;
    customer.middlename=req.body.middlename;
    customer.lastname=req.body.lastname;
    customer.dob=req.body.dob;
    customer.phonenumber=req.body.phonenumber;
    customer.occupation=req.body.occupation;
    customer.aincome=req.body.aincome;
    customer.address=req.body.address;

    customer.save(function(err,customer){
        if (err){
            console.log(err);
            res.send("Error");
            return;}
        else{
        console.log("Saved customer to DB");
        res.redirect("/customer/login");
        }
    });
}

function login(req, res) {
    console.log(req.body.ownerid);
    console.log(req.body.password);

    let id = req.body.ownerid;
    let pass = req.body.password;

    Owner.findOne({ ownerid: id }, function(err, owner) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else if (!owner) {
            res.status(401).send("Owner not found");
        } else {
            if (owner.ownerpassword === pass) {
                res.send("Logged in");
            } else {
                res.status(401).send("Incorrect password");
            }
        }
    });
}

function loginGet(req, res){
    res.sendFile(__dirname +'/clogin.html');
}


const customer = {
    register,
    regsub,
    login,
    loginGet
}

module.exports = customer;