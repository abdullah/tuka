goog.provide('Row')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')
goog.require('goog.string')

/**
 * @constructor
 */
Row = function (row,index) {

	this.contents = row.contents;
	this.name = row.name;
	this.template = row.template;
	this.thumbnail = row.thumbnail;
	this.index = index;

	this.render()

}


Row.prototype.render = function(){

	var lang = this.store.getCurrentLanguage();
	var html = this.contents[lang].html ;
	
	var rowNode = goog.dom.createDom('div',{
		class: "tuka-row"
	},null)

	rowNode.innerHTML = goog.string.isEmpty(html) ? this.template : html;

	goog.dom.appendChild(DomNodes.AREA,rowNode);
};
Row.prototype.store = Store;
