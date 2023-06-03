<<<<<<< HEAD
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/keyword_extraction",
    createProxyMiddleware({
      target: "http://3.130.14.102",
=======
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/similarity',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_TARGET,
      changeOrigin: true,
    })
  );

  app.use(
    '/ner_inference',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_TARGET,
      changeOrigin: true,
    })
  );

  app.use(
    '/keyword_extraction',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_TARGET,
>>>>>>> d78a859ce07b6b490dfcf411afac728ab243f06d
      changeOrigin: true,
    })
  );
};
