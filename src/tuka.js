goog.provide('Tuka')
goog.require('Store')
goog.require('App')

goog.require('goog.dom')
goog.require('goog.array')
goog.require('goog.dom.classlist')

/**
 * Default object
 * @type {Object}
 * @export
 * @todo Remove modules after change location of modules  
 */
var _opt = {
	el: "app",
	languages:["en","tr"],
	defaultLanguage:"tr",
	modules:[
		{
			name: "module_one",
			template:'<div contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, itaque?</div>',
			languages:{},
			fields:{}
		}
	],
	rows:[]
}

/**
 * @constructor
 * @return {Tuka} The Tuka 
 * @todo Merge _opt to options
 * @export
 * @todo Set language of modules
 */
Tuka = function (options) {
	/** @type {object}  */
	this.options = _opt;
	// Store.subscribe(this.update);
	this.init();
}


Tuka.prototype.store = Store;
Tuka.prototype.app = new App();

/**
 * Init dom node -- area and modules list.
 * @return {Void} 
 */
Tuka.prototype.init = function(){

	var rows = goog.array.clone(this.options.rows);
	this.store.setRows(rows)

	this.setDomNodes()
	this.setLanguageForModule()

};

Tuka.prototype.setLanguageForModule = function(){
	
	var modules = goog.array.clone(this.options.modules);
	var languages = goog.array.clone(this.options.languages);

	languages.forEach( function(lang) {
		modules.forEach( function(module) {
			module.languages[lang] = ""
		});
	});

	this.store.setModules(modules);
};


Tuka.prototype.setDomNodes = function(){
	/** Create dom nodes */
	var el   = goog.dom.getElement(this.options.el);
	
	var list = goog.dom.createDom('div',{class:"tuka-list"},null);
	var area = goog.dom.createDom('div',{class:"tuka-area"},null);

	goog.dom.appendChild(el,list);
	goog.dom.appendChild(el,area);
	goog.dom.classlist.add(el,"tuka-app");
};










