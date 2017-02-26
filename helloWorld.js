var http = require('http');
var fs=require('fs');
var mongoose = require('mongoose');
var express = require('express');


//DB config
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/users');
//jquery post request
//express end point
//my schema
/*var userSchema= new Schema({
    userName:{
        type: String;
        unique:true;
    };
    password: String;
    //description:String;
});

// Line to set up your schema, var User = get schema heres

// db variable
/* var user = new User({
  // json data
}); */
//var user = new User({


//})

//user.save(function(err, res) {
// if err then do something
// if res you gucci

//serving staticfiles
function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode=200;
    fs.readFile("C:/Users/Michelle/Documents/GitHub/HackBu2017/veiws/"+ path ,function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('500 - Internal Error');
        }

        else{
            res.writeHead(responseCode,{'Content-Type': contentType});
               res.end(data);
        }
    });

}//serving staticfiles


//create Server
http.createServer(function(req,res){ 
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
    	case '':
    			serveStaticFile(res, "index.html", 'text/html');
                break;
    	case '/about':
    			serveStaticFile(res, 'about.html', 'text/html');
    			break;
    	default:
    			serveStaticFile(res, 'error404.html', 'text/html');
    			break;


    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....'); 