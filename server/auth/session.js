let expressSession = require('express-session')
let MongoStore = require('connect-mongodb-session')(expressSession)


let store = new MongoStore({
  uri: 'mongodb://hackathon2:hackathon2@ds038888.mlab.com:38888/hackathon1',
  collection: "Sessions"
})

store.on('error', error => {
  console.error('[SESSION ERROR]', error)
})

let session = expressSession({
  secret: "It's a secret for everybody",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  },
  store,
  resave: true,
  saveUninitialized: true
})


module.exports = session