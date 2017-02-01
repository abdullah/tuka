goog.provide('Area')
goog.require('Row')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')
goog.require('goog.string')
goog.require('RenderTypes')

/**
 * @constructor
 */
Area = function (e) {
	this.store.subscribe(this.render.bind(this))
}

Area.prototype.store = Store;

Area.prototype.render = function(params){
	var renderType = params.renderType
	var row = params.row;

	if (RenderTypes.NEW_ROW == renderType) {
	
		new Row(row)

	}else if (RenderTypes.FULL_ROW == renderType) {
		
		var rows = this.store.getRows();
		rows.forEach(function (row,index) {
			new Row(row,index)
		});

	}else{
	    throw new Error("Invalid Render Type ");
	}


};


Area.prototype.update = function(){
	
};