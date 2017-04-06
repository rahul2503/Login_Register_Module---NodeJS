var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var user = require('./resource/userResource');

mongoClient.connect('mongodb://localhost/ineed', function(err, db) {
    if(err) { 
        return console.dir(err); 
    } else {
        console.log("connected to database");
        db.close();
    }
});


app.use(bodyParser.json());


app.post('/api/user/register', user.registerUser);
app.post('/api/user/login/', user.loginUser);
app.post('/api/user/create_profile', user.createUserProfile);
app.post('/api/user/get_profile', user.getUserProfile);
// app.post('/api/user/update_profile', user.updateUser); 

app.listen(1234);
console.log('Running on port 1234');
