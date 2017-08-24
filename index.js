const { lookup } = require('dns');

module.exports = ({ family = 4, all = true }={}) => (address, cb) => {
  lookup(address, { family, all }, (err, ...args) => {
    if (err) { return cb(err); }
    const [addresses, family] = args;
    if (family) {
      return cb(null, addresses);
    }
    cb(null, addresses.map(({ address }) => address));
  });
};
