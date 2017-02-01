goog.provide('Store')
goog.require('RenderTypes')

var state = {
    currentLanguage:"",
	rows: [],
	modules:[]
}

var handlers = [];  // observers


Store.setCurrentLanguage = function (l) {
    state.currentLanguage = l
}

Store.getCurrentLanguage = function () {
    return state.currentLanguage
}

Store.setRows =  function(rows){
	state.rows = rows;
}

Store.setComponents =  function(modules){
	state.modules = modules;
}

Store.addRow =  function (row) {
	state.rows.push(row);
    
    this.fire(null,{
        renderType: RenderTypes.NEW_ROW,
        row: row,
    })

	return state.rows
}

Store.getRows =  function (row) {
    return state.rows
}

Store.getComponents =  function (row) {
	return state.modules
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
