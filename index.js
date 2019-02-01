const { lookup } = require('dns');

const withPort = port => port !== undefined ? address => address + ':' + port : address => address;
const PortRE = /:([0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

module.exports = ({ family = 4, all = true }={}) => (address, cb) => {
  const [, port] = address.match(PortRE) || [];
  const format = withPort(port);

  address = address.replace(PortRE, '');

  lookup(address, { family, all }, (err, ...args) => {
    if (err) { return cb(err); }
    const [addresses, family] = args;
    if (family) {
      return cb(null, format(addresses));
    }
    cb(null, addresses.map(({ address }) => format(address)));
  });
};
