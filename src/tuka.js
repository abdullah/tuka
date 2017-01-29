goog.provide('Tuka')
goog.require('Store')
goog.require('App')

goog.require('goog.dom')
goog.require('goog.dom.classlist')

/**
 * Default object
 * @type {Object}
 * @todo Remove modules after change location of modules 
 */
var _opt = {
	el: "#app",
	language:["en","tr"],
	defaultLanguage:"tr",
	modules:[
		{
			name: "module_one",
			template:`<div contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, itaque?</div>`,
			languages:{},
			fields:{}
		}
	],
	rows:[],
}

/**
 * @constructor
 * @return {Tuka} The Tuka 
 * @todo Merge _opt to options
 * @todo update
 * @todo Set language of modules
 */
Tuka = function (options) {
	/** @type {object}  */
	this.options = options
	this.init();
}


Tuka.prototype.store = new Store();
Tuka.prototype.app = new App();

/**
 * Init dom node -- area and modules list.
 * @return {Void} 
 */
Tuka.prototype.init = function(){
	/** Create dom nodes */
	var el   = goog.dom.getElement(this.options.el);
	
	var list = goog.dom.createDom('div',{class:"tuka-list"},null);
	var area = goog.dom.createDom('div',{class:"tuka-area"},null);

	goog.dom.appendChild(el,list);
	goog.dom.appendChild(el,area);
	goog.dom.classlist.add(el,"tuka-app");
	
	/** Init rows  */
	this.store.setRows(this.options.rows)
};



