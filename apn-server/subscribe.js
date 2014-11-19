// Manual subscribe to node pushserver instance running locally
var http = require('http');

var user = {
  user: 'user1',
  type: 'ios',
  token: '796b796c6492e32c61vbd2aac154cdb22468fab1b822052db1b81a99e9322048'
}
 
var userString = JSON.stringify(user);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': userString.length
};

var options = {
  host: 'localhost',
  port: 8000,
  path: '/subscribe',
  method: 'POST',
  headers: headers
};

// Setup the request.  The options parameter is
// the object we defined above.
var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

  var responseString = '';

  res.on('data', function(data) {
    responseString += data;
    console.log("Data " + responseString);
  });

  res.on('end', function() {
    //var resultObject = JSON.parse(responseString);
    console.log("End ");
  });
});

req.on('error', function(e) {
  console.log("Error " + e);
});

req.write(userString);
req.end();
