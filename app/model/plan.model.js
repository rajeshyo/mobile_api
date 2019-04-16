module.exports = (sequelize, Sequelize) => {
	const Plan = sequelize.define('plan', {
	  plan_name: {
		  type: Sequelize.STRING
	  },
	  plan_dec: {
		  type: Sequelize.STRING
	  }
	});
	
	return Plan;
}