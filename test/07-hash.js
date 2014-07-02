var nacl = (typeof window !== 'undefined') ? window.nacl : require('../nacl.min.js');
var test = require('tape');

var randomVectors = require('./data/hash.random');
var specVectors = require('./data/hash.spec');

var enc = nacl.util.encodeBase64,
    dec = nacl.util.decodeBase64;

test('nacl.hash length', function(t) {
  t.equal(nacl.hash(new Uint8Array(0)).length, 64);
  t.equal(nacl.hash(new Uint8Array(100)).length, 64);
  t.end();
});

test('nacl.hash exceptions for bad types', function(t) {
  t.throws(function() { nacl.hash('string'); }, TypeError, 'should throw TypeError for string type');
  t.throws(function() { nacl.hash([1,2,3]); }, TypeError, 'should throw TypeError for array type');
  t.end();
});

test('nacl.hash specified test vectors', function(t) {
  specVectors.forEach(function(vec) {
    var goodHash = new Uint8Array(vec[0]);
    var msg = new Uint8Array(vec[1]);
    var hash = nacl.hash(msg);
    t.equal(enc(hash), enc(goodHash));
  });
  t.end();
});

test('nacl.hash random test vectors', function(t) {
  randomVectors.forEach(function(vec) {
    var msg = dec(vec[0]);
    var goodHash = dec(vec[1]);
    var hash = nacl.hash(msg);
    t.equal(enc(hash), enc(goodHash));
  });
  t.end();
});
