const { createProxyMiddleware } = require('http-proxy-middleware');
var app = require('express')();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers,Content-Length,Accept,Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use('/cqds-web', createProxyMiddleware({
  target: 'http://172.21.9.143:11000',
  changeOrigin: true,
  ws: true,
  pathRewrite: {}
}));
app.use('/bank-test', createProxyMiddleware({
  target: 'http://172.21.9.14:11000',
  changeOrigin: true,
  ws: true,
  pathRewrite: {}
}));

app.listen('5010', () => {
  console.log('服务器启动成功！访问：http://localhost:5010');
})