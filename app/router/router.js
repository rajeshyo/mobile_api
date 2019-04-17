//this two file authentication chaking require in router folder
const verifySignUp = require('./verifySignUp');
//this is jwt token authentication in signin api
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
	//This is controler file require in controler folder
    const controller = require('../controller/controller.js');
	//This is Signup api
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	//this is user delete api
	app.delete('/api/test/user/:Id/userdelete', controller.userdelete);
	//this is user update api
	app.put('/api/test/user/:Id/userupdate', controller.userupdate);
	//This is Signin api
	app.post('/api/auth/signin', controller.signin);
	//This is Find One User Details api
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	//This is Find one PM user api
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	//This is Find One Admin api
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
	//This is Booking apartment api
	app.post('/api/test/user/:Id/apt', controller.apt);
	//This is user_apartment table api
	//app.post('/api/test/user/:Id/apat', controller.user_apartment);
	//This is paln api
	app.post('/api/test/user/plan', controller.plan);
    //This is cartype api
	app.post('/api/test/user/cartype', controller.cartype);
	//This is palnoffer api
	app.post('/api/test/user/planoffer', controller.planoffer);
	//This is schedule api
	app.post('/api/test/user/schedule', controller.schedule);

}