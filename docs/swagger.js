import swaggerAutogen from 'swagger-autogen'
import npmPackageJson from '../package.json' assert {type: 'json'}

const doc = {
  info: {
    version: npmPackageJson.version,
    title: 'Spot On API',
    description: npmPackageJson.description
  },
  servers: [
    {
      url: 'https://localhost/',
      description: 'Local'
    },
    {
      url: 'https://spot-on-api-61c1dd69af4d.herokuapp.com/',
      description: 'Production'
    },
    // { ... }
  ],
  tags: [                   // by default: empty Array
    {
      name: '',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  components: {}            // by default: empty object
}

const outputFile = './swagger-output.json'
const routes = ['../server.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);