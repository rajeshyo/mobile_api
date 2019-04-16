const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Apt = db.apt;
//const User_Apartment = db.user_apartment;
const Cartype = db.cartype;
const Plan = db.plan;
const Planoffer = db.planoffer;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
		  where: {
			name: {
			  [Op.or]: req.body.roles
			}
		  }
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.send("User registered successfully!");
            });
		}).catch(err => {
			res.status(500).send("Error -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access User Page",
			"error": err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Management Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}



//apt

// exports.apt = (req, res) => {
// 	// Save User to Database
// 	// console.log("Processing func -> SignUp");
// 	const today = new Date()
// 	Apt.create({
// 		  name: req.body.name,
// 		  mobile: req.body.mobile,
// 		  lat: req.body.lat,
// 		  long: req.body.long,
// 		  created: today
// 	}).then(apt => {
// 		Role.findOne({
// 		  where: {
// 			name: {
// 			  [Op.or]: req.body.roles
// 			}
// 		  }
// 		}).then(roles => {
// 			apt.setRoles(roles).then(() => {
// 				res.send("apt registered successfully!");
//             });
// 		}).catch(err => {
// 			res.status(500).send("Error -> " + err);
// 		});
// 	}).catch(err => {
// 		res.status(500).send("Fail! Error -> " + err);
// 	})
// }




//////////////////////////////////////////////////////////////
//     Apartment 
exports.apt = (req, res) => {
	// Save User to Database
	// console.log("Processing func -> SignUp");
	const today = new Date()
	// const  Id  = req.params
	Apt.create({
		  name: req.body.name,
		  mobile: req.body.mobile,
		  lat: req.body.lat,
		  long: req.body.long,
		  created: today,
		  userId: req.params.Id,
		  aptIid: req.body.apartmentid
	}).then(apt => {
		Apt.findOne({
		  where: {
			id: req.body.id,
		  }
		}).then(apt => {
		
			res.send("Apartment registered successfully!");
			            
			}).catch(err => {
					res.status(500).send("Error -> " + err);
					});
		}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}



// exports.user_apartment = (req, res) => {
// 	// Save User to Database
// 	// console.log("Processing func -> SignUp");
// 	const today = new Date()
// 	// const  Id  = req.params
// 	User_Apartment.create({
		
// 		  apartment_id: req.body.apartment_id,
// 		  userId: req.params.Id,
// 	}).then(user_apartment => {
// 		User_Apartment.findOne({
// 		  where: {
// 			id: req.body.id,
// 		  }
// 		}).then(user_apartment => {
		
// 			res.send("Apartment registered successfully!");
			            
// 			}).catch(err => {
// 					res.status(500).send("Error -> " + err);
// 					});
// 		}).catch(err => {
// 		res.status(500).send("Fail! Error -> " + err);
// 	})
// }


///////////////////////////// End Apartment  /////////////////////


//////////////////////////// Start Plan ///////////////////////////
exports.plan = (req, res) => {
	// const  Id  = req.params
	Plan.create({
		  plan_name: req.body.plan_name,
		  plan_dec: req.body.plan_dec,
	}).then(plan => {
		Plan.findOne({
		  where: {
			id: req.body.id,
		  }
		}).then(plan => {
		
			res.send("plan registered successfully!");
			            
			}).catch(err => {
					res.status(500).send("Error -> " + err);
					});
		}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}



////////////////////////////////End Plan ////////////////////////////

///////////////////////////////Start PlanOffer ////////////////////////////
exports.planoffer = (req, res) => {
	// const  Id  = req.params
	Planoffer.create({
		  offer_name: req.body.offer_name,
		  offer_dec: req.body.offer_dec,
	}).then(planoffer => {
		Planoffer.findOne({
		  where: {
			id: req.body.id,
		  }
		}).then(planoffer => {
		
			res.send("planoffer registered successfully!");
			            
			}).catch(err => {
					res.status(500).send("Error -> " + err);
					});
		}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}



///////////////////////////////End PlanOffer ////////////////////////////
exports.cartype = (req, res) => {
	// const  Id  = req.params
	Cartype.create({
		  cartype: req.body.cartype,
		  car_dec: req.body.car_dec,
	}).then(cartype => {
		Cartype.findOne({
		  where: {
			id: req.body.id,
		  }
		}).then(cartype => {
		
			res.send("cartype registered successfully!");
			            
			}).catch(err => {
					res.status(500).send("Error -> " + err);
					});
		}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}



///////////////////////////////Start cartype ////////////////////////////



///////////////////////////////End cartype ////////////////////////////