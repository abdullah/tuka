goog.provide('Tuka')
goog.require('Store')
goog.require('App')
goog.require('DomNodes')

goog.require('goog.dom')
goog.require('goog.array')
goog.require('goog.dom.classlist')

/**
 * Default object
 * @type {Object}
 * @export
 * @todo Remove Component after change location of Component  
 */
var _opt = {
	el: "app",
	languages:["en","tr"],
	defaultLanguage:"tr",
	Component:[
		{
			name: "module_one",
			thumbnail:"https://www.google.com.tr/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
			template:'<div contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, itaque?</div>',
		}
	],
	rows:[]
}

/**
 * @constructor
 * @return {Tuka} The Tuka 
 * @todo Merge _opt to options
 * @export
 * @todo Set language of Component
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
 * Init dom node -- area and Component list.
 * @return {Void} 
 */
Tuka.prototype.init = function(){

	var rows = goog.array.clone(this.options.rows);
	this.store.setRows(rows)

	this.setDomNodes()
	this.setLanguageForModule()
	this.app.start()

};

/**
 * This method will be create contents property each Component
 */
Tuka.prototype.setLanguageForModule = function(){
	
	var Component = goog.array.clone(this.options.Component);
	var languages = goog.array.clone(this.options.languages);

	Component.forEach( function(module) {
		module.contents = {};
		languages.forEach( function(lang) {
			module.contents[lang] = {}
			module.contents[lang].fields = {}
			module.contents[lang].html = ""
		});
	});

	this.store.setComponents(Component);
};


Tuka.prototype.setDomNodes = function(){
	/** Create dom nodes */
	DomNodes.APP   = goog.dom.getElement(this.options.el);
	
	DomNodes.LIST = goog.dom.createDom('div',{class:"tuka-list"},null);
	DomNodes.AREA = goog.dom.createDom('div',{class:"tuka-area"},null);

	goog.dom.appendChild(DomNodes.APP,DomNodes.LIST);
	goog.dom.appendChild(DomNodes.APP,DomNodes.AREA);
	goog.dom.classlist.add(DomNodes.APP,"tuka-app");
};










