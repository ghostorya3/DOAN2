var http = require('http');
var httpProxy = require('http-proxy');

var proxy = new httpProxy.createProxyServer({
    target: {
        host: 'localhost',
        port: 8443
    }
});

var proxyServer = http.createServer(function (req, res) {
    if (!req.url.includes('/?folder=/config/workspace')) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('NotFound');
    }
    proxy.web(req, res);
});

proxyServer.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

proxyServer.listen(3001, function () {
    console.log('Proxy server is running and listening on port 3001');
});


