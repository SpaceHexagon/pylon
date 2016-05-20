// Document Store
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _documents = {}; // collection of todo items

/**
 * Create a Document.
 * @param {string} text The content of the Document
 */
function create(text) {
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _documents[id] = {
    id: id,
    title: "",
		type: "text",
		attachments: [],
    text: text
  };
}

/**
 * Delete a Document.
 * @param {string} id
 */
function destroy(id) {
  delete _documents[id];
}

var DocumentStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _documents;
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
      case AppConstants.DOCUMENT_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          DocumentStore.emitChange();
        }
        break;

      case AppConstants.DOCUMENT_DESTROY:
        destroy(action.id);
        DocumentStore.emitChange();
        break;

      // add more cases for other actionTypes, like DOCUMENT_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = DocumentStore;
