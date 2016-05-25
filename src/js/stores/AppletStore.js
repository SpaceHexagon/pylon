// Applet Store
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _applets = {}; // collection of todo items

/**
 * Create a Message.
 * @param {string} text The content of the Message
 */
function create(text) {
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _applets[id] = {
    id: id,
    to: "",
    name: "",
	  cell: [0, 0, 0],
		open_resources: [],
    text: text
  };
}

/**
 * Delete a Message.
 * @param {string} id
 */
function destroy(id) {
  delete _applets[id];
}

var AppletStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _applets;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case AppConstants.APPLET_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          AppletStore.emitChange();
        }
        break;

      case AppConstants.APPLET_DESTROY:
        destroy(action.id);
        AppletStore.emitChange();
        break;

      // add more cases for other actionTypes, like APPLET_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppletStore;
