// // pages/api/proxy.js
// import { createProxyMiddleware } from 'http-proxy-middleware';

// // Create a proxy instance
// const apiProxy = createProxyMiddleware({
//   target: 'http://api.zealthtechnologies.com',
//   changeOrigin: true,
// });

// // Export a function that handles the request
// export default (req, res) => {
//   // Run the proxy
//   apiProxy(req, res);
// };
