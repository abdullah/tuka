goog.provide('Store')


/**
 * @constructor
 */
Store = function () {
	this.state = {
		rows: []
	}
}

Store.prototype.addRow = function (row) {
	this.state.rows.push(row)
	return this.state.rows
}


Store.prototype.getRows = function (row) {
	return this.state.rows
}

