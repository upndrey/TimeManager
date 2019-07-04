const client = require("../db/connection.js");
const Utility = require("../models/Utility.js");

module.exports = class Statistics{
	static countTime(data){
		var timeStats = [];
		for(var i = 0; i < data.length; i++){
			timeStats[i] = [];
		}
		data.forEach((elem, i) => {
			var timerName = Object.entries(elem)[0][1];
			var dateofstart = Object.entries(elem)[1][1];
			var dateofend = Object.entries(elem)[2][1];
			if(dateofstart != "" && dateofend != ""){
		        var separator = /[.: ]/g;

		        var start = dateofstart.split(separator);
		        var end = dateofend.split(separator);

		        var startDate = new Date(start[2], start[1] - 1, start[0], start[3], start[4], start[5]);
		        var endDate = new Date(end[2], end[1] - 1, end[0], end[3], end[4], end[5]);

		        var t = endDate.getTime() - startDate.getTime();

		        timeStats[i][0] = timerName;
        		timeStats[i][1] = t;
		    }
		})
		var result = [];
		for(var i = 0; i < data.length; i++){
			result[i] = [];
		}
		for(var i = 0; i < timeStats.length; i++){
			var tempName = timeStats[i][0];
			var tempTime = timeStats[i][1];
			for(var j = i + 1; j < timeStats.length; j++){
				if(timeStats[j][0] == tempName){
					tempTime += timeStats[j][1];
					if(j != 0)
						timeStats.splice(j, 1);
					else
						timeStats.splice(0, 1);
					result.pop();
				}
			}
			result[i][0] = tempName;
			result[i][1] = Utility.convertTime(tempTime);
		}
		return result;
	}

	static render(request, response){
		var tableName = request.session.name + "Timers";
		var userName = request.session.name
	    var text = "SELECT * FROM "+ tableName;
		client.query(text, (err, res) => {
			if (err)
				console.log(err.stack);
			else{	
				response.render("statistics.hbs", { timeStats: Statistics.countTime(res.rows), user: userName }, (err, html) => {
					response.send(html);
				});	
			}
		});
	}
}