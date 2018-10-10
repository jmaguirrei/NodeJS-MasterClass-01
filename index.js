

// Dependencies
const http = require('http');
const url = require('url');

// Define a router
const router = {
  hello(data, callback) {
    // callback http status code and payload object
    callback(200);
  },
  notFound(data, callback) {
    callback(404);
  },
};

// createServer
function createServer(req, res) {

  // parse url (returns an object)
  const parsedUrl = url.parse(req.url, true); // true: use query string module

  // get path from the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // removes extra slashes...

  req.on('data', data => {
    console.log('data --> ', data);
  });

  req.on('end', () => {

    // Choose the handler, use notFound if not found
    const chosenHandler = router[trimmedPath] || router.notFound;

    chosenHandler(null, statusCode => {
      // use status code of the handler or default to 200
      const resultingStatusCode = typeof statusCode === 'number' ? statusCode : 200;

      // return the response
      const message = 'Hello from Chile 🇨🇱';
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(resultingStatusCode);
      res.end(JSON.stringify({ message }));

    });

  });

}

const server = http.createServer(createServer);

// Start the server and listen
server.listen(3030, () => {
  console.log('Listening on port 3030');
});
