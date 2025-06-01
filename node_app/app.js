const express = require("express");
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');

const cors = require("cors");
const app = express();
//var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

const router = express.Router();
const path = __dirname + "/views/";
const port = 8080;

const axios = require("axios");
const { MongoNetworkError } = require("mongodb/lib/core");

//https://ezdevs.com.br/comecando-uma-api-rest-com-node-js/
//require('./src/Routes/index')(app); // <--- basta adicionar essa linha

//Loads the handlebars module
//const exphbs  = require('express-handlebars');
// define a extensão e a instância do handlebars com o modelo que será interpretado o código
//app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));

// define qual o template a ser utilizado

//app.set('view engine', 'hbs');
var sess = {secret:'josé'};
app.use(session(sess));
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');
//app.set("views", "./views");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/cortapau", router);

require("./src/Routes/index")(router); // <--- basta adicionar essa linha

router.use(express.static(__dirname + "/public"));


// Error handling Middleware functions
const errorLogger = (error, request, response, next) => {
  console.log( `error ${error.message}`) 
  next(error) // calling next middleware
}

const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", 'application/json')
  const status = error.status || 400;
  response.statusCode = status;
  response.send(error);
}

const invalidPathHandler = (request, response, next) => {
  response.status(400)
  response.send('invalid path')
}

router.use(errorLogger)
router.use(errorResponder)
router.use(invalidPathHandler)


/*
router.use(function(err, req, res, next) {
  console.error(err.stack);
  
  res.status(err.status || 500).send(app.get('env'));
  //res.status(err.status || 500).send('Something broke!');
  //next(err);
});
*/
//app.use('/', router);


router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

app.listen(port, function () {
  console.log("Example app listening on port 8080!");
});
