const client = require("../db/connection.js");

module.exports = class Timer{

	constructor(timerName, dateOfStart){
		this.timerName = timerName;
		this.dateOfStart = dateOfStart;
		this.dateOfEnd = null;
	}	


	editTime(time) {
		if(time < 10)
			return "0" + time;
		return time;
	}

	output(date){
		return this.editTime(date.getDate()) + "." + 
		this.editTime(date.getMonth() + 1) + "." + 
		date.getFullYear() + " " + 
		this.editTime(date.getHours()) + ":" + 
		this.editTime(date.getMinutes()) + ":" + 
		this.editTime(date.getSeconds());
	}

	static startTimer(request, response, date, timername){
    	var tableName = request.session.name + "Timers";
		var timer = new Timer("timerName", date);
	    var text = "INSERT INTO "+ tableName + " (timerName, dateOfStart, dateOfEnd) VALUES ($1, $2, null);";
		var values = [timername, timer.output(date)];
	    client.query(text, values, (err, res) => {
			if (err) {
				console.log(err.stack);
			}
	    });
	}

	static stopTimer(request, response, today){
		var timer = new Timer("timerName", today);
    	var tableName = request.session.name + "Timers";
		var text = "UPDATE "+ tableName + " SET dateOfEnd = $1 WHERE dateOfEnd IS NULL";
		var values = [timer.output(today)];

		client.query(text, values, (err, res) => {
			if (err) {
				console.log(err.stack);
			}
    	});
	}

	static render(request, response){
		var tableName = request.session.name + "Timers";
		var userName = request.session.name;
	    var text = "SELECT * FROM "+ tableName;
		client.query(text, (err, res) => {
			if (err)
				console.log(err.stack);
			else{
				response.render("main.hbs", { timers: res.rows, user: userName }, (err, html) => {
					response.send(html);
				});	
			}
		});
	}

}