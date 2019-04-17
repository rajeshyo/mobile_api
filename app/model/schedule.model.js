module.exports = (sequelize, Sequelize) => {
	const Schedule = sequelize.define('schedule', {
        schedule_name: {
		  type: Sequelize.STRING
	  }
	});
	
	return Schedule;
}