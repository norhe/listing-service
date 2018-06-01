function resolveDB(addr, port) {
  return new Promise( function(resolve, reject) {
    if (isConsulAddr(addr)) {
      dns.setServers(['127.0.0.1:8600'])
      dns.resolveSrv(addr, (err, srv) => {
        if (err) {
          reject(err);
        } else {
          resolve(buildDSN(srv[0].name, srv[0].port))
        }
      })
    } else {
      resolve(buildDSN(addr, port))
    }
  })
}

function buildDSN(addr, port) {
  return 'mongodb://'+ addr + ':' + port
}

function isConsulAddr(addr) {
  return addr.endsWith('consul')
}

module.exports = resolveDB
