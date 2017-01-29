goog.provide('Tuka')
goog.require('Store')
goog.require('App')

/**
 * @constructor
 * @return {Tuka} The Tuka 
 */
Tuka = function () {}

Tuka.prototype.store = new Store();
Tuka.prototype.app = new App();
