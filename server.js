var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
//this is require router file in router folder and pass the app variable in express function 
require('./app/router/router.js')(app);

//This is configration in config folder
const db = require('./app/config/db.config.js');

//This is Roal table in down it is theire tale schema content
const Role = db.role;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
  //this is initial() create the Role table 
 //initial();
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})

//This is Role Table data
function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}