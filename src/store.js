goog.provide('Store')

var state = {
	rows: [],
	modules:[]
}

var handlers = [];  // observers


Store.setRows =  function(rows){
	state.rows = rows;
}

Store.setComponents =  function(modules){
	state.modules = modules;
}

Store.addRow =  function (row) {
	state.rows.push(row);
    this.fire()
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

Store.fire =  function(o, thisObj) {
    var scope = thisObj || window;
    handlers.forEach(function(item) {
        item.call(scope, o);
    });
}
