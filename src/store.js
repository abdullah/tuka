goog.provide('Store')
goog.require('RenderTypes')

Store.state = {
    languages: [],
    currentLanguage:"",
    splitArea:false,
    rows: [],
    modules:[]
}

var handlers = [];  // observers

Store.setLanguages = function (langs) {
    this.state.languages = langs
}

Store.getLanguages = function (langs) {
    return this.state.languages
}

Store.setCurrentLanguage = function (l) {
    this.state.currentLanguage = l
}

Store.getCurrentLanguage = function () {
    return this.state.currentLanguage
}

Store.setRows =  function(rows){
	this.state.rows = rows;
}

Store.setComponents =  function(modules){
	this.state.modules = modules;
}

Store.addRow =  function (row) {
	this.state.rows.push(row);
    
    this.fire(null,{
        renderType: RenderTypes.NEW_ROW,
        row: row,
    })

	return this.state.rows
}

Store.getRows =  function (row) {
    return this.state.rows
}

Store.getComponents =  function (row) {
	return this.state.modules
}

/** Observerble pattern */
Store.subscribe =  function(fn) {
    handlers.push(fn);
}

Store.unsubscribe =  function(fn) {
    handlers = handlers.filter(
        function(item) {
            if (item !== fn) {
                return item;
            }
        }
    );
}

Store.fire =  function(thisObj,params ) {
    var scope = thisObj || window;
    handlers.forEach(function(item) {
        item.call(scope, params);
    });
}
