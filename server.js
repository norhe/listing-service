const express     = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser  = require('body-parser')
const db          = require('./config/db');

const app = express()
const port = 8000;


app.use(bodyParser.urlencoded({ extended: true }));

// TODO: add auth later (Vault)
MongoClient.connect(db.url, { useNewUrlParser: true },(err, database) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  // TODO: load this from a file or env (consul)
  dbConn = database.db(db.db_name)
  require('./app/routes')(app, dbConn, {collection: db.db_col});
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})