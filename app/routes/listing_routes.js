os = require('os')

module.exports = function(app, db, conf) {

  app.get('/listing/healthz', (req, res) => {
    res.sendStatus(200)
  }),

  app.get('/listing/:id', (req, res) => {
    var details = {'listing_id': req.params.id };
    console.log("Retrieving record for ", details)
    db.collection(conf.collection).findOne(details, (err, item) => {
      console.log("found item:", item)
      if (err) {
        res.send({'error': 'Could not retrieve listing from database'})
      } else if (null == item) {
        res.send({'error': 'Record not found in database with listing_id = ' + details.listing_id})
      } else {
        res.send(item)
      }
    })
  }),

  app.get('/listing', (req, res) => {
    console.log("listing")
    db.collection(conf.collection)..find({}, { projection: {_id: 0 }} ).limit(5).toArray( (err, item) => {
      if (err || null == item) {
        res.send({'error': 'Could not retrieve listing from database'})
      } else {
        item.unshift("Response provided by " + os.hostname())
        res.send(item)
      }
    })
  }),

  app.post('/listing', (req, res) =>{
    var listing = { text: req.body.body, title: req.body.title};
    db.collection(conf.collection).insert(listing, (err, result) => {
      if (err) {
        res.send({'error': 'Failed to create record'})
      } else {
        res.send(result.ops[0])
      }
    })
  })
};
