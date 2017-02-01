goog.provide('Row')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')
goog.require('goog.string')
goog.require('goog.object')

/**
 * @constructor
 */
Row = function (row,index) {
	this.row = row
	this.index = index;
	this.node = null

	this.append()

}


Row.prototype.append = function(){
	var that = this;
	var lang = this.store.getCurrentLanguage();
	var html = this.row.contents[lang].html ;
	
	var rowNode = goog.dom.createDom('div',{
		class: "tuka-row"
	},null)

	rowNode.innerHTML = goog.string.isEmpty(html) ? this.row.template : html;

	goog.dom.appendChild(DomNodes.AREA,rowNode);
	
	this.node = rowNode;
	var children = goog.dom.getChildren(rowNode)

	goog.object.map(children, function (e) {
		var isNode = goog.dom.isNodeLike(e);
		if (isNode && e.contentEditable) {
			e.onblur = function () {
				that.updateHtml()
			}
		}

	})
};


Row.prototype.updateHtml = function(){
	
	var lang = this.store.getCurrentLanguage();
	this.row.contents[lang].html = this.node.innerHTML;

	console.log(state.rows)
};



Row.prototype.store = Store;
