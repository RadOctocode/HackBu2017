class Account{
  var userName;
  var description;
  var password;

  constructor(myDescription,myUserName,myPassword) {
    description=myDescription;
    userName=myUserName;
    password=myPassword;
  } 
}


// require mongoose
// optional: set promise library to get rid of stupid deprecation warnings (e.g. bluebird)
// save mongoose.Schema into variable
//var userSchema = new Schema({
  // Data here
  //username: {
    //type: String,
    //unique: true
  //}//, etc.
//});
// Line to set up your schema, var User = get schema here

// db variable
/* var user = new User({
  // json data
}); */

//user.save(function(err, res) {
// if err then do something
// if res you gucci
}