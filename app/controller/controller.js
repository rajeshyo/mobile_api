const db = require('../config/db.config.js');
const config = require('../config/config.js');
//This is database migration file  name require in config folder db.config.js
const User = db.user;
const Role = db.role;
const Apt = db.apt;
//const User_Apartment = db.user_apartment;
const Cartype = db.cartype;
const Schedule = db.schedule;
const Plan = db.plan;
const Planoffer = db.planoffer;

const Op = db.Sequelize.Op;

//This is Jwt Token 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


/////////////////////////////// Start User Section //////////////////////////////////////////////////////////////

///////////////////////////////Start SignUp ////////////////////////////
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


// exports.userupdate = function (req, res, next) {
// 	var User = findOne(req.params.Id);
// 	User.name = req.body.name;
// 	User.email = req.body.email;
// 	res.send({message:'okok'});
//   }




exports.userdelete = (req, res) => {
	User.findOne({
		where: {
			id: req.params.Id
		}
	}).then(user => {
  if(!user) {
	return res.status(400).send({
	message: 'user Not Found',
	});
  }
  return user
	.destroy()
	.then(() => res.status(200).send({
	  message: 'user successfully deleted'
	}))
	.catch(error => res.status(400).send(error));
})
.catch(error => res.status(400).send(error))
}


exports.userupdate = (req, res) => {
	User.findOne({
		where: {id: req.userId},
	})
	User.update({
		name: req.body.name,
		// username: req.body.username,
		// where: {id: req.params.Id}
	}).then((updateduser) => {
			res.status(200).send({
			  message: 'user updated successfully',
			//   data: {
			// 	name: name || updateduser.name,
			// 	username: username || updateduser.username,
			// 	// email: email || updateduser.email,
			// 	// password: password || updateduser.password
			//   }
			})
		  }).catch(err => {
			res.status(500).send("Error -> " + err);
		});
}
///////////////////////////////End Signup ////////////////////////////

///////////////////////////////Start SignIn ////////////////////////////
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
///////////////////////////////End Signin ////////////////////////////

///////////////////////////////Start Find One user ////////////////////////////
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
///////////////////////////////End Find One User ////////////////////////////

///////////////////////////////Start Find One Admin ////////////////////////////
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
///////////////////////////////End Find One Admin cartype ////////////////////////////

///////////////////////////////Start Find one Pm ////////////////////////////
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
/////////////////////////////// End Find One PM ////////////////////////////

/////////////////////////////// End User Section ///////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Apartment Section//////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Start Apartment Booking ////////////////////////////
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
/////////////////////////////// End Apartment Booking ////////////////////////////

/////////////////////////////// Start User_Apartment Booking Table ////////////////////////////
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
/////////////////////////////// End user_Apartment Booking TAble ////////////////////////////

///////////////////////////// End Apartment  /////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Start Plan Section//////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////// End Plan Section//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Start CarType Section//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////Start cartype ////////////////////////////
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
///////////////////////////////End cartype ////////////////////////////
//////////////////////////// End Cartype Section//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Start Schedule Section//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////Start Schedule ////////////////////////////
exports.schedule = (req, res) => {
	// const  Id  = req.params
	Schedule.create({
		  schedule_name: req.body.schedule_name,
		  car_dec: req.body.car_dec,
	}).then(schedule => {
		Schedule.findOne({
		  where: {
			id: req.body.id,
		  }
		}).then(schedule => {
		
			res.send("schedule registered successfully!");
			            
			}).catch(err => {
					res.status(500).send("Error -> " + err);
					});
		}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}
///////////////////////////////End Schedule ////////////////////////////

//////////////////////////// End Schedule Section//////////////////////////////////////////////////////////////////////////////////////////





