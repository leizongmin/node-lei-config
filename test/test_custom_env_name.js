/**
 * lei-config tests
 * 
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var should = require('should');
var config = require('../');


it('default', function () {
  
  //------------------------------------------

  config.__init();
  process.env.CUSTOM_ENV = 'development';
  
  //------------------------------------------
  
  config.init({
    path: path.resolve(__dirname, 'config_1'),
    envName: 'CUSTOM_ENV'
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