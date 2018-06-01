function resolveDB(addr, port) {
  return new Promise( function(resolve, reject) {
    if ((!addr.endsWith('service.consul')) ||
        (!addr.endsWith('query.consul'))) {
      resolve(buildDSN(addr, port))
    } else {
      dns.setServers(['127.0.0.1:8600'])
      dns.resolveSrv(addr, (err, srv) => {
        if (err) {
          reject(err);
        } else {
          resolve(buildDSN(srv[0].name, srv[0].port))
        }
      })
    }
  })
}

function buildDSN(addr, port) {
  return 'mongodb://'+ addr + ':' + port
}

module.exports = resolveDB
