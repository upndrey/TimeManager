const User = require("../models/user.js");
const crypto = require("crypto");
const client = require("../db/connection.js");

exports.login = function (request, response){
    response.render("login.hbs");
};

exports.registration = function (request, response){
    response.render("registration.hbs");
};

exports.addUser = function(request, response){
    const username = request.body.name;
    const password = request.body.password;

    const sha256 = crypto.createHash("sha256");
	sha256.update(password, "utf8");
	const hashedPassword = sha256.digest("hex");

	var text = 'SELECT name FROM Accounts WHERE name = ($1);';
	var values = [username];
	client.query(text, values, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
	    else if (res.rows[0] != undefined) {
	        //console.log('Пользователь с таким именем уже существует!');
    				response.redirect("/registration");
	    } 
	    else {
	    	text = 'INSERT INTO Accounts (name, password) VALUES ($1, $2);';
			values = [username, hashedPassword];
	        client.query(text, values, (err, res) => {
				if (err) {
					console.log(err.stack);
				} else {
					//console.log("Пользователь успешно добавлен!");
				}
	        });
	        const temp = username + "Timers";
	        text = "CREATE TABLE " + temp + "(timerName VARCHAR(20) NOT NULL, dateOfStart VARCHAR(20) NOT NULL, dateOfEnd VARCHAR(20));";
	        client.query(text, (err, res) => {
	        	console.log(err, res);
				if (err) {
					console.log(err.stack);
				} else {
					//console.log("Таблица успешно создана!");
				}
	        });
	    }
	});
    response.redirect("/login");
};

exports.enter = function(request, response){
    const username = request.body.name;
    const password = request.body.password;

    const sha256 = crypto.createHash("sha256");
	sha256.update(password, "utf8");
	const hashedPassword = sha256.digest("hex");

	var text = 'SELECT name FROM Accounts WHERE name = ($1);';
	var values = [username];
	client.query(text, values, (err, res) => {
		if (err) {
			console.log(err.stack);
		}
	    else if (res.rows[0] == undefined) {
	        //console.log('Пользователь с таким именем не существует!');
			response.redirect("/login");
	    } 
	    else {
	    	text = 'SELECT name FROM Accounts WHERE name = $1 and password = $2;';
			values = [username, hashedPassword];
	        client.query(text, values, (err, res) => {
				if (err) {
					console.log(err.stack);
				}
				else if (res.rows[0] != undefined) {
					//console.log("Успешно!");
					request.session.name = username;
    				response.redirect("./");
				}
				else {
					//console.log("Неверный пароль!");
    				response.redirect("/login");
				}
	        });
	    }
	});
};

exports.logout = function (request, response){
	request.session.name = null;
	response.redirect("/login");
};