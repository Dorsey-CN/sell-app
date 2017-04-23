var express = require('express');
var config = require('./config/index.js');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
	req.url = './index.html';
	next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get("/seller",function(request,response){
  response.json({
    errorno:0,
    data:seller
  })
})

apiRoutes.get("/goods",function(request,response){
  response.json({
    errorno:0,
    data:goods
  })
})

apiRoutes.get("/ratings",function(request,response){
  response.json({
    errorno:0,
    data:ratings
  })
})

app.use("/api",apiRoutes);
app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})