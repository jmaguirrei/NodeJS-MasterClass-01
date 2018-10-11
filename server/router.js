

// Define a router
module.exports = {
  hello(data, callback) {
    // callback http status code and payload object
    callback(200);
  },
  notFound(data, callback) {
    callback(404);
  },
};

