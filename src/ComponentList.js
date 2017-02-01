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
	
	components.forEach( function(c) {
		
		var component = goog.dom.createDom('A',{
			class: "module-list-item",
			href: "#"
		});

		var thumbnail = goog.dom.createDom('IMG',{
			class: "module-list-thumbnail",
			style: "width: 100px"
		});

		thumbnail.src = c.thumbnail

		component.onclick = function () {
			that.store.addRow(c)
		}

		goog.dom.appendChild(component,thumbnail)
		goog.dom.appendChild(DomNodes.LIST,component)
	});
	
};

ComponentList.prototype.update = function(){
	
};