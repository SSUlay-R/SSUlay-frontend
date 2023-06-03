const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/keyword_extraction",
    createProxyMiddleware({
      target: "http://3.130.14.102",
      changeOrigin: true,
    })
  );
};
