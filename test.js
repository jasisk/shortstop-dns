const initDns = require('./index.js');
const { test } = require('tap');

test('good host', t => {
  t.test('default arguments', t => {
    const dns = initDns();
    dns('localhost', (err, addresses) => {
      t.error(err);
      t.type(addresses, 'Array', 'returns an array');
      t.ok(addresses.length, 'returns at least one address');
      t.match(addresses, /127.0.0.1/, 'contains 127.0.0.1');
      t.end();
    });
  });
  t.test('all: false', t => {
    const dns = initDns({all: false});
    dns('localhost', (err, addresses) => {
      t.error(err);
      t.type(addresses, 'string', 'returns a String');
      t.end();
    });
  });
  t.end();
});

test('good host with port', t => {
  const port = 1234;
  t.test('default arguments', t => {
    const dns = initDns();
    dns('localhost:' + port, (err, addresses) => {
      t.error(err);
      t.type(addresses, 'Array', 'returns an array');
      t.ok(addresses.length, 'returns at least one address');
      t.match(addresses, new RegExp('127.0.0.1:' + port), 'contains 127.0.0.1:port');
      t.end();
    });
  });
  t.test('all: false', t => {
    const dns = initDns({all: false});
    dns('localhost:' + port, (err, addresses) => {
      t.error(err);
      t.type(addresses, 'string', 'returns a String');
      t.ok(addresses.endsWith(':' + port), 'end with the port');
      t.end();
    });
  });
  t.end();
});

test('bad host', t => {
  const dns = initDns();
  dns('this.will.never.exist.duh', (err, addresses) => {
    t.ok(err, 'returns an error');
    t.end();
  });
});
