var http = require('http');
var httpProxy = require('http-proxy');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 8443
  }
});

var proxyServer = http.createServer(function (req, res) {

  if (!req.url.includes('token')) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('NotFound');
  }

  let token = req.url.split('&')[0].replace('?token=', '')
  if (!token) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('NotFound');
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err || !req.url.includes(decoded?.data?.url)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('NotFound');
    }
  });

  proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

proxyServer.listen(3001, function () {
  console.log('Proxy server is running and listening on port 3001');
});


