///////////////////////////////////////////////
// All middleware installation and router
// injection happens here
//////////////////////////////////////////////

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://beeradvisor.cloudapp.net:7474/');
var bodyParser = require('body-parser');
// var LocalStrategy = require('passport-local').Strategy;

var jwt = require('jwt-simple');

module.exports = function(req, res, next){
  console.log('HWERWERWERWERQWERQWERQWERQWERWQERWWERWERWEERWERWE')

  var token = req.headers['x-access-token'];
  var username = req.headers['x-username'];
  console.log('username = ', username, '  token =  ', token)
  if (token && username) {
    console.log('looking at token')
    var decoded = jwt.decode(token, 'secret');
    if (decoded === username) {
      console.log('OOOOOOOK', decoded)
    // if (decoded.exp <= Date.now()) {
    //   // res.end('Access token has expired', 400);
    //   //rather than doing that, I thought we should just redirect them home to log in again.
    //   res.redirect('/home');
    } else {
    console.log('denied', decoded)
    res.redirect('/home')
    } 
  } else {
    console.log('denied', decoded)
    res.redirect('/home')
  }
};

// var passport = require('passport');

// passport.use(new LocalStrategy(function(username, password, done) {
//   var params = {username: username, password: password};
//   db.query('MATCH (n:User) WHERE n.username=({username}) RETURN n', params, function(err, data) {
//     if (err) {return done(err)}
//     if (!data) {
//       return done(null, false, {message: 'Wrong username!'});
//     }
//     var user = data[0].n //access username part of data sent
//     if (password !== user._data.data.password) { //check if password matches  
//       return done(null, false, {message: 'Wrong password'})
//     }
//     return done(null, user);
//   })
// }))

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   var params = {id: id};
//   db.query('MATCH (n:User) WHERE id(n)=({id}) RETURN n', params, function(err, data) {
//     if(err) {console.log(err);}
//     var user = data[0].n;
//     done(err, user);
//   });
// });

// module.exports = passport; 
