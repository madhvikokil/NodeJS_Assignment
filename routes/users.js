import express from 'express'
let router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('login page. <h1> pppppp </h1>');
});

router.get('/signup', function(req, res, next) {
  res.send('signup page');
});

// register data
router.post('/signup', function(req, res, next) {
  let name = req.body.name
  let lastname = req.body.lastname
  let username = req.body.username
  let password = req.body.password
  let password2 = req.body.password


  // validation of the inputs

  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('lastname', 'Last name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('password2', 'Password2 do not match').equals(req.body.password)

  let errors = rew.validationErrors()

  if(errors) {
    res.render('users/signup',{
      errors:errors
    })
    
  } else{
    console.log("Passed")
  }
  
});

module.exports = router;
