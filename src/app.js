goog.provide('App')
goog.require('Store')
goog.require('ComponentList')
goog.require('Area')


/**
 * @constructor
 */
App = function () {
}

App.prototype.store = Store;
App.prototype.CL = new ComponentList();
App.prototype.area = new Area();

App.prototype.start = function(){
	this.CL.render()
	this.area.render({
		renderType: RenderTypes.FULL_ROW
	})
};

App.prototype.update = function(){
	
};