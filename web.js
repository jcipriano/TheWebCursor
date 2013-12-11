var
express = require('express'),
path = require('path'),
app = express();

app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});