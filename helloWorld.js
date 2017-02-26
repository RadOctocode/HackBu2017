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
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


mongoose.connect('mongodb://localhost:27017/hackbu');

var userSchema= new Schema({
    username:{
        type: String,
        unique:true
    },
    password: String
});

var requestSchema= new Schema({
    usernameTo:String,
    description: String,
    usernameFrom:String
});

var User = mongoose.model('User', userSchema, 'users');
var Request = mongoose.model('Request', requestSchema, 'requests'); 

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
            User.findOne({ username: username }, function(err, myUser){
                console.log(myUser);
                if(err){console.log("Wrong password/username");}

                else{
                        if(myUser.password===password){
                            return res.redirect('/home');
                        }

                        else{
                            console.log("Wrong password/username");
                        }
                }
            });
});

/*app.post('/deleteReq', function(req, res){



});*/

app.get('/user/:username', function(req, res) {
    var findUser=req.params.username;
    console.log(findUser);
    return User.findOne({ username: findUser}, function(err, myUser) {
        console.log(myUser);
        if (err || !myUser) {
            console.log(err);
            return res.redirect('/home');
        }
        return res.render('users.html',{
            "myUser" : myUser
        });
    });
});

app.get('/inbox/:username', function(req, res) {
    var findUser=req.params.username;
    return Request.find({ usernameTo: findUser}, function(err, myReq) {
        console.log("hey"+myReq);

        if (err || !myReq) {
            console.log(err);
            return res.redirect('/home');
        }

        return res.render('inbox.html',{
            "requets": myReq 
        });
    });
});


app.post('/sendReq', function(req, res){
        var request= new Request({
        "usernameTo": req.body.usernameT,
        "description": req.body.fight_req,
        "usernameFrom": req.body.usernameF

        });
        console.log(request);
        request.save(function(err){
            console.log(err);
            return res.redirect('/home');
        });

});


app.get('/fightform', function(req, res) {
        return res.render('fight_form');
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/registration.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname+'/views/homePage.html'));
});

app.listen(3000, function() {
    console.log('Running on localhost:3000');
});
