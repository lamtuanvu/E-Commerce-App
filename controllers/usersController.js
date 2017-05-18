// Import User Model
var db = require("../models");
var isAuthenticated = require('../config/middleware/isAuthenticated.js');

// ROUTES  
function router(app) {

  // view table of all users - ADMIN
  app.get('/users', isAuthenticated, function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.render('users', { users, user: req.user });
    });
  });

  // view update form for specific user 
  app.get('/users/:id', isAuthenticated, function(request, res) {
    db.User.findOne({
      where: {
        id: reqest.params.id
      }
    }).then(function(user) {
      res.render('user-update', { user, user: req.user });
    }).catch(function(err) {
        console.log(err.message);
        res.send(err);
    });
  });

  // create new user - might change once we figure out authentication 
  app.post('/users', isAuthenticated, function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pwd: req.body.password
    }).then(function(result) {
      res.redirect('/users');
    }).catch(function(err) {
        console.log(err.message);
        res.send(err)
    });
  });

  // update user information - might change once we figure out authentication 
  app.put('/users/:id', isAuthenticated, function(req, res) {
    db.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }, { 
      where : {
        id: req.params.id
      }
    }).then(function(result){
        res.redirect('/users');
    }).catch(function(err) {
        console.log(err.message);
        res.send(err)
    });
  });

  // delete user 
  app.delete('/users/:id', isAuthenticated, function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.redirect('/users');
    }).catch(function(err) {
        console.log(err.message);
        res.send(err)
    });
  });
}

module.exports = router;
