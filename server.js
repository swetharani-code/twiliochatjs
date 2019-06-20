var express = require('express');
var TokenProvider = require('./lib/tokenprovider');
const credentials = process.env.credentials || {
  "accountSid": "ACfde1a0930e9276220ef4db8c55166fb3",
  "signingKeySid": "SKa3e7db35d0a5e616e3ed4fb22689bf26",
  "signingKeySecret": "XZTRMV3DoNp30pR74Fly3LD0tJBEPwwz",
  "serviceSid": "IS9fe3829f33b74c3088fb9f08859b2a33",
  "pushCredentialSid": "CR9acd7d5e09881d06398f388808d99df7"
}
const port = process.env.PORT || 8081
var app = new express();
var tokenProvider = new TokenProvider({
  "accountSid": process.env.accountSid,
  "signingKeySid": process.env.signingKeySid,
  "signingKeySecret":  process.env.signingKeySecret,
  "serviceSid":  process.env.serviceSid,
  "pushCredentialSid": process.env.pushCredentialSid
});

if (credentials.authToken) {
  console.warn('WARNING: The "authToken" field is deprecated. Please use "signingKeySecret".');
}

if (credentials.instanceSid) {
  console.warn('WARNING: The "instanceSid" field is deprecated. Please use "serviceSid".');
}

app.get('/getToken', function(req, res) {
  var identity = req.query && req.query.identity;
  if (!identity) {
    res.status(400).send('getToken requires an Identity to be provided');
  }

  var token = tokenProvider.getToken(identity);
  res.send(token);
});

app.use(express.static(__dirname + '/public'));

app.listen(port);
