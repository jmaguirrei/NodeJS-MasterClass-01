

// Dependencies
const url = require('url');
const router = require('./router');

// createServer
module.exports = function createServer(req, res) {

  // parse url (returns an object)
  const parsedUrl = url.parse(req.url, true); // true: use query string module

  // get path from the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // removes extra slashes...

  // WITHOUT THIS LINE EXAMPLE DOES NOT WORK, WHY ??
  req.on('data', console.log);

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

};
