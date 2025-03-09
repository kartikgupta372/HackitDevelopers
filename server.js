const http = require('http');
const app = require('./app'); // Importing Express app instance
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

module.exports = server;
