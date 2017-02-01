goog.provide('ComponentList')
goog.require('Store')
goog.require('DomNodes')
goog.require('goog.dom')

/**
 * @constructor
 */
ComponentList = function () {
	
}

ComponentList.prototype.store = Store;

ComponentList.prototype.render = function(){
	var components = this.store.getComponents();
	var that = this;
	
	components.forEach( function(component) {
		
		var componentNode = goog.dom.createDom('A',{
			class: "module-list-item",
			href: "#"
		});

		var thumbnail = goog.dom.createDom('IMG',{
			class: "module-list-thumbnail",
			style: "width: 100px"
		});

		thumbnail.src = component.thumbnail

		componentNode.onclick = function () {
			that.generateComponentFields(component)
		}

		goog.dom.appendChild(componentNode,thumbnail)
		goog.dom.appendChild(DomNodes.LIST,componentNode)
	});
	
};



ComponentList.prototype.generateComponentFields = function(component){
	var languages = this.store.getLanguages();

	component.contents = {};
	languages.forEach( function(lang) {
		component.contents[lang] = {}
		component.contents[lang].fields = {}
		component.contents[lang].html = component.template
	});


	this.store.addRow(component)
	
};


