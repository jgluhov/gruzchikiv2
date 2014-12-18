var express = require('express'),
    router = express.Router();    

var User = require('../model/user');

/* Create user page. */
router.route('/user')
    .post(function(req, res, next) {
        var newUser = new User();
        
        newUser.username = req.body.username;
        newUser.password = newUser.generateHash(req.body.password);
        
        //save the user
        newUser.save(function(err){
            if(err) throw err;
            res.status(200).send("User was created successfully!");            
        });
    });

module.exports = router;
