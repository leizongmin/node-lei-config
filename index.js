/**
 * lei-config
 * 
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var fs = require('fs');
var createNS = require('lei-ns').Namespace;
var debug = require('debug')('lei:config');
var config = module.exports;


config._options = {};
config._inited = false;
config.env = 'production';

/**
 * init
 * 
 * @param {Object} options
 */
config.init = function (options) {
  debug('init');
  options = options || {};
  if (!config._inited) {
    options.envName = options.envName || 'NODE_ENV';
    options.path = options.path || './config';
    options.defaultName = options.defaultName || 'default';
  }
  for (var i in options) {
    config._options[i] = options[i];
    debug('init: set options %s=%j', i, options[i]);
  }
  config._inited = true;
};

config._loadFile = function (ns, name) {
  var f = path.resolve(config._options.path, name);
  require(f)(ns);
  return ns;
};

config._loadDefaultFile = function (ns) {
  return config._loadFile(ns, config._options.defaultName);
};

/**
 * load
 * 
 * @param {String} env
 * @return {Object}
 */
config.load = function (env) {
  if (!config._inited) config.init();
  
  debug('load');
  var options = config._options;
  config.env = env = (env || process.env[options.envName] ||config.env).toString().trim();
  
  config.ns = createNS();
  config._loadDefaultFile(config.ns);
  config._loadFile(config.ns, config.env);
  
  return config.get();
};

/**
 * get
 * 
 * @param {String} name
 * @return {Object}
 */
config.get = function (name) {
  if (arguments.length > 0) {
    return config.ns(name);
  } else {
    return config.ns();
  }
};
 
/**
 * set
 * 
 * @param {String} name
 * @param {Object} value
 * @return {Object}
 */
config.set = function (name, value) {
  return config.ns(name, value);
};
