goog.provide('Area')
goog.require('Row')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')
goog.require('goog.string')
goog.require('RenderTypes')
goog.require('goog.inherits')


/**
 * @constructor
 */
Area = function (l) {
	this.language = l;
	this.store.subscribe(this.render.bind(this));

	console.log(this)
	if (this.isRender()) {
		this.node = goog.dom.createDom('div',{class:"tuka-area-container"},null);
		goog.dom.appendChild(DomNodes.AREA,this.node);
	}

}


Area.prototype.store = Store;

Area.prototype.render = function(params){

	if (this.isRender()) {

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

	}

};

Area.prototype.isRender = function(){
	return this.store.state.currentLanguage == this.language
};

Area.prototype.update = function(){
	
};