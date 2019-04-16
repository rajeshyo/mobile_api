module.exports = (sequelize, Sequelize) => {
	const Planoffer = sequelize.define('planoffer', {
	  offer_name: {
		  type: Sequelize.STRING
	  },
	  offer_dec: {
		  type: Sequelize.STRING
	  }
	});
	
	return Planoffer;
}