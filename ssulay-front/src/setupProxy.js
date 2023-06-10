const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
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
      changeOrigin: true,
    })
  );
};
