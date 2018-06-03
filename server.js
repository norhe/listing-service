const express     = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser  = require('body-parser')
const db          = require('./config/db');
//const resolveDB   = require('./config/resolveSrv')

const app = express()

const PORT = process.env.LISTING_PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// TODO: add auth later (Vault)
// require('./config/resolveSrv')(db.db_addr, db.db_port).then( (dsn) => {
var db_proxy_addr = 'mongodb://localhost:8001'
MongoClient.connect(db_proxy_addr, { useNewUrlParser: true },(err, database) => {
  if (err) return console.log(err)

  // Make sure you add the database name and not the collection name
  // TODO: load this from a file or env (consul)
  dbConn = database.db(db.db_name)
  require('./app/routes')(app, dbConn, {collection: db.db_col});
  app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
  });
})
/*}).catch( (err) => {
  console.log("An error occurred resolving the DSN" + err)
})*/
