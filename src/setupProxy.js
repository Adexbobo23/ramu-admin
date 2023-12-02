const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-staging.ramufinance.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1/admin',
      },
    })
  );
};
