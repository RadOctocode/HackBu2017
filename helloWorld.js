var fs=require('fs');
var mongoose = require('mongoose');
var express = require('express');
var router=express.Router();
var assert = require('assert');
var Schema=mongoose.Schema;
var path = require('path');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/hackbu');

var userSchema= new Schema({
    username:{
        type: String,
        unique:true
    },
    password: String
});

var User = mongoose.model('User', userSchema, 'users');

//mongoose.connect('mongodb://localhost:27017/users');

app.post('/pls', function(req, res){
        console.log(req.body);
        var user= new User({
        "username": req.body.username,
        "password": req.body.password
        });
        console.log(user);
        user.save(function(err){
            console.log(err);
            return res.redirect('/');
        });

});

app.post('/login', function(req, res){
        
        var username=req.body.username;
        var password= req.body.password;
            User.find({ username: username }, function(err, myUser){
                if(err){console.log("Wrong password/username");}

                else{
                        if(myUser[0].password===password){
                            return res.redirect('/home');
                        }

                        else{
                            console.log("Wrong password/username");
                        }
                }
            });
});




app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/veiws/index.html'));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname+'/veiws/registration.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname+'/veiws/login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname+'/veiws/homePage.html'));
});


app.listen(3000, function() {
    console.log('Running on localhost:3000');
});
