

// Dependencies
const http = require('http');
const createServer = require('./createServer');

const server = http.createServer(createServer);

// Start the server and listen
server.listen(3030, () => {
  console.log('Listening on port 3030');
});
