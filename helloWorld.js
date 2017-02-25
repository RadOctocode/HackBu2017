var http = require('http');
fs=require('fs');

function serveStaticFiles(res, path, contentType, responseCode){
    if(!responseCode) responseCode=200;
    fs.readFile(_dirname + path, function(err,data)){
        

    }







}

http.createServer(function(req,res){ 
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
    	case '':
    			res.writeHead(200, {'Content-Type': 'text/plain'});
    			res.end('Homepage');
    			break;
    	case '/about':
    			res.writeHead(200,{'Content-Type': 'text/plain'});
    			res.end('About');
    			break;
    	default:
    			res.writeHead(404,{ 'Content-Type':'text/plain'});
    			res.end('Not Found');
    			break;


    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....'); 