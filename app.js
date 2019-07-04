const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const hbs = require("hbs");

const app = express();
const userRouter = require("./routes/userRouter.js");
const timerRouter = require("./routes/timerRouter.js");
const statsRouter = require("./routes/statsRouter.js");
const client = require("./db/connection.js");

app.use(express.static(__dirname + '/public'));
client.connect();

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
	secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
}));

app.use("/", userRouter);
app.use("/", timerRouter);
app.use("/", statsRouter);
app.use("/", function (request, response) {
  response.redirect("/main")
});
app.listen(3000);