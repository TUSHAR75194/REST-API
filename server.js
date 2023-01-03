const http = require('http');
// const { router } = require('./app');
const app = require('./app')
const server = http.createServer(app);

// server.listen(5000,console.log('app is running'));




server.listen(2000, () => {
    console.log("server is running on port 2000");
  });