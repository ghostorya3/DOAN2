const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3001;
const CODE_SERVER_URL = 'http:/localhost:8443'; // URL của code-server

// Proxy cho HTTP và WebSocket
app.use('/', createProxyMiddleware({
  target: CODE_SERVER_URL,
  changeOrigin: true,
  ws: true, // Kích hoạt WebSocket proxy
  onProxyReqWs: (proxyReq, req, socket, options, head) => {
    console.log('WebSocket proxy request', req.url);
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
