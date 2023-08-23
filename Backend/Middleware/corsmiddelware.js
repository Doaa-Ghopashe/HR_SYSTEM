const cors = require('cors'),

corsOptions =  {
  origin: ['http://localhost:4200'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = cors(corsOptions)