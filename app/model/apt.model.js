module.exports = (sequelize, Sequelize) => {
	const Apt = sequelize.define('apt', {
	
        name: {
            type: Sequelize.STRING
          },
          mobile: {
            type: Sequelize.STRING
          },
          lat: {
            type: Sequelize.STRING
          },
          long: {
            type: Sequelize.STRING
          },
          
	});
	
	return Apt;
}