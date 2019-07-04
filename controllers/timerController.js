const Timer = require("../models/timer.js");
const client = require("../db/connection.js");

exports.addTimer = function (request, response){
	var today = new Date();
	var timerName = request.body.timerName;
	if(timerName == "")
		timerName = "no name";
    var tableName = request.session.name + "Timers";
    var text = "SELECT timerName FROM "+ tableName + " WHERE dateOfEnd IS NULL";
    client.query(text, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
		else if (res.rows[0] != undefined) 
			Timer.stopTimer(request, response, today);	
	    Timer.startTimer(request, response, today, timerName);
		response.redirect("./main");
    });
}

exports.stopTimer = function (request, response){
	var today = new Date();
    var tableName = request.session.name + "Timers";
    var text = "SELECT timerName FROM "+ tableName + " WHERE dateOfEnd IS NULL";
    client.query(text, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
		else if (res.rows[0] != undefined) 
			Timer.stopTimer(request, response, today);	
		response.redirect("./main");
    });
}

exports.startTimer = function (request, response){
	var today = new Date();
	var timerName = "";
	for(var i = 0; i < 3; i++){
		if(Object.entries(request.body)[i][1] == "Включить"){
			timerName = Object.entries(request.body)[i][0];
			break;
		}
	}
    var tableName = request.session.name + "Timers";
    var text = "SELECT timerName FROM "+ tableName + " WHERE dateOfEnd IS NULL";
    client.query(text, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
		else if (res.rows[0] != undefined) 
			Timer.stopTimer(request, response, today);	
	    Timer.startTimer(request, response, today, timerName);
		response.redirect("./main");
    });
}

exports.deleteTimers = function (request, response){
    var tableName = request.session.name + "Timers";
    var text = "DELETE FROM "+ tableName;
    client.query(text, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
		response.redirect("./main");
    });
}

exports.main = function (request, response){
	if(request.session.name){
		Timer.render(request, response);
    }
    else{
		response.redirect("./login");
    }
};

