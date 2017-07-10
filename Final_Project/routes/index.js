var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


router.post('/authenticate', function(req, res){
	console.log("Here");


    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/final';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
          
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('users');
  
        // Get the student data passed from the form
        var a = req.body.username;
        var b = req.body.password;
        
        console.log(req.body.username);
        //var status = 0;

         
       collection.find({"username": a, "password":b}).toArray(function (err, result) {
       if (err) {
         
        res.send(err);
       } else if (result.length) {

       
		 // Redirect to the homepage
            res.redirect("signedhome");
         
       } else {
           
        res.send('Invalid login');
      }
      //Close connection
      db.close();
    });

      }
    });

  });

router.get('/signedhome', function(req, res, next) {
  res.render('signedhome', { title: 'signedhome' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'aboutus' });
});

router.get('/friends', function(req, res, next) {
  res.render('friends', { title: 'friends' });
});
router.get('/groups', function(req, res, next) {
  res.render('groups', { title: 'groups' });
});
router.get('/moviepage', function(req, res, next) {
  res.render('moviepage', { title: 'moviepage' });
});
router.get('/movies', function(req, res, next) {
  res.render('movies', { title: 'movies' });
});



module.exports = router;
