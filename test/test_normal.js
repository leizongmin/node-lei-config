/**
 * lei-config tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var should = require('should');
var config = require('../');


it('normal', function () {

  //------------------------------------------

  config._init_module();
  delete process.env.NODE_ENV;

  //------------------------------------------

  config.init({
    path: path.resolve(__dirname, 'config_1')
  });

  var c = config.load();
  should.equal(c.test.env, 'production');

  should.equal(config.get('test.env'), 'production');
  should.deepEqual(config.get(), c);
  should.ok(config.has('test.env'));
  should.ok(!config.has('test.env2'));

  config.set('a.b.c', 1234567);
  should.equal(config.get('a.b.c'), 1234567);

  should.equal(config.ns('test.env'), 'production');
  should.equal(config.ns('a.b.c'), 1234567);
  config.ns('a.b.e', 111111);
  should.equal(config.ns('a.b.e'), 111111);

  //------------------------------------------

  config._init_module();
  process.env.NODE_ENV = 'development';

  //------------------------------------------

  config.init({
    path: path.resolve(__dirname, 'config_1')
  });

  var c = config.load();
  should.equal(c.test.env, 'development');

  should.equal(config.get('test.env'), 'development');
  should.deepEqual(config.get(), c);

  config.set('a.b.c', 55555555);
  should.equal(config.get('a.b.c'), 55555555);

  should.equal(config.ns('test.env'), 'development');
  should.equal(config.ns('a.b.c'), 55555555);
  config.ns('a.b.e', 98765);
  should.equal(config.ns('a.b.e'), 98765);

});