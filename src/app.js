goog.provide('App')
goog.require('Store')
goog.require('ComponentList')
goog.require('Area')
goog.require('Row')
goog.require('goog.inherits')


/**
 * @constructor
 */
App = function () {

}


App.prototype.store = Store;
App.prototype.CL = new ComponentList();

App.prototype.start = function(){

	this.CL.render()
	var langs = this.store.getLanguages();
	
	langs.forEach( function(l) {
		var areaName = l//.toUpperCase();

		App.prototype[areaName] = new Area(l)
		App.prototype[areaName].render({
			renderType: RenderTypes.FULL_ROW,
		});

	});



	
};

App.prototype.update = function(){
	
};


goog.inherits(Row,Area)
