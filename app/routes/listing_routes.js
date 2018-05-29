module.exports = function(app, db, conf) {
  
  app.get('/listing/:id', (req, res) => {
    var details = {'listing_id': req.params.listing_id };
    db.collection(conf.collection).findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'Could not retrieve listing from database'})
      } else {
        res.send(item)
      }
    })
  }),

  app.get('/listing', (req, res) => {
    db.collection(conf.collection).find({}, {'_id': false, 'limit':10}).toArray( (err, item) => {
      if (err) {
        res.send({'error': 'Could not retrieve listing from database'})
      } else {
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