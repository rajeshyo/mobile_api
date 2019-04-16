module.exports = (sequelize, Sequelize) => {
	const Cartype = sequelize.define('cartype', {
	  cartype: {
		  type: Sequelize.STRING
	  },
	  car_dec: {
		  type: Sequelize.STRING
	  }
	});
	
	return Cartype;
}