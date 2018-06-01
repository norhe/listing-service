var addr = process.env.DB_URL ? process.env.DB_URL : 'localhost'
var port = process.env.DB_PORT ? process.env.DB_PORT : '27017'
var name = process.env.DB_NAME ? process.env.DB_NAME : 'bbthe90s'
var collection = process.env.DB_COLLECTION ? process.env.DB_COLLECTION : 'listings'
var user = process.env.DB_USER ? process.env.DB_USER : 'mongo'
var pw = process.env.DB_PW ? process.env.DB_PW : 'mongo'

module.exports = {
  db_addr: addr,
  db_port: port,
  db_name: name,
  db_user: user,
  db_pw: pw,
  db_col: collection
}
