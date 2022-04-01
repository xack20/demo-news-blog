const {createProxyMiddleware}=require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/upload',{target:'http://localhost:3005'})),
    app.use(createProxyMiddleware('/pictures',{target:'http://localhost:3004'})),
    app.use(createProxyMiddleware('/newsArray',{target:'http://localhost:3004'}))
}