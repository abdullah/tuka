goog.provide('Area')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')

/**
 * @constructor
 */
Area = function (e) {
	this.store.subscribe(this.render.bind(this))
}

Area.prototype.store = Store;

Area.prototype.render = function(){
	var rows = this.store.getRows();
	console.log("msg")
};

Area.prototype.update = function(){
	
};