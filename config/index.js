var path = require('path'),
    nconf = require('nconf');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at './config.json'
//

nconf.argv()
       .env()
       .file({ file: path.join(__dirname, 'config.json') });

//
// Set a few variables on `nconf`.
//
//nconf.set('database:host', '127.0.0.1');
//nconf.set('database:port', 5984);

module.exports = nconf;