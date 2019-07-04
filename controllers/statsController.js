const Statistics = require("../models/statistics.js");

exports.statistics = function (request, response){
    if(request.session.name){
		Statistics.render(request, response);
    }
    else{
		response.redirect("./login");
    }
};

exports.logout = function (request, response){
	request.session.name = null;
	response.redirect("/login");
};