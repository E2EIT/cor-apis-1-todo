var Model = {
	/* The Model handles our data. */

	// Our model has a single ToDoItem array
	ToDoItemArray: [],

	// ToDoItem Factory
	ToDoItem: function newToDoItem(id, title) {
		return {
			id: id,
			title: title,
			complete: false
		}
	},

	toggleItemComplete: function toggleItemComplete(index) {
		/**
		 * Sets the To Do item at 'index' to complete.
		 * @index: integer
		 */
		Model.ToDoItemArray[index].complete = !Model.ToDoItemArray[index].complete;
	}
};

var View = {
	// The View handles changes to our view (DOM)

	getElementById: function getElementById(id) {
		return document.getElementById(id);
	},

	updateToDoCount: function updateToDoCount() {
		var itdCntElm = View.getElementById('itdCnt');
		var itdCnt = 0;
		Model.ToDoItemArray.forEach(function (toDoItem, index) {
			if (!toDoItem.complete) ++itdCnt;
		});
		// Clear the current HTML list
		itdCntElm.innerHTML = '' + itdCnt;
	},

	addToDoItem: function addToDoItem(toDoItem) {
		var toDoListElm = View.getElementById('ulToDoList');
		var cbId = 'cb_' + toDoItem.id;
		var divId = 'div_' + toDoItem.id;
		var classList = '';
		if (toDoItem.complete) {
			classList += ' todo-complete';

		}

		var itemHtml
			= '<div id="' + divId + '" class="item item-checkbox">\n    '
			+ '	<label class="checkbox">\n'
			+ '		<input id=' + cbId + ' type="checkbox" '
			+ '			onclick="Controller.toggleItemComplete(' + toDoItem.id + ')">\n'
			+ '	</label>\n'
			+ ' ' + toDoItem.title
			+ '</div>\n';

		// Add the new item to the end of the list
		toDoListElm.insertAdjacentHTML('beforeend', itemHtml);
		// Update the To Do counts.
		View.updateToDoCount();
	},

	getInputText: function getInputText() {
		var inputElem = View.getElementById('titleInput');
		return inputElem.value;
	},

	resetInput: function resetInput() {
		var inputElm = View.getElementById('titleInput');
		inputElm.value = null;
		inputElm.focus();
		var addBtnElm = View.getElementById('addBtn');
		addBtnElm.disabled = true;
	}
};

var Controller = {
	/* The Controller handles the App logic */

	// Controller initialization
	init: function init() {
		// Add a click listener to our Add button
		var addBtnElm = View.getElementById('addBtn');
		addBtnElm.onclick = Controller.addNewToDoItem;

		// Start with the Add button disabled
		addBtnElm.disabled = true;

		// Add a checks for valid input state (non-empty)
		var inputElm = View.getElementById('titleInput');
		inputElm.onkeyup = function () {
			// If the input field has a value, enable the Add button
			addBtnElm.disabled = !inputElm.value;
		};
		inputElm.oninvalid = function () {
			addBtnElm.disabled = true;
		}
	},

	addNewToDoItem: function addNewToDoItem() {
		var id = Model.ToDoItemArray.length;
		var title = View.getInputText();
		var newToDo = new Model.ToDoItem(id, title);

		// Add new item to the array
		Model.ToDoItemArray.push(newToDo);

		// Clear the input field
		View.resetInput();

		// Add new item to the view list
		View.addToDoItem(newToDo);
	},


	toggleItemComplete: function toggleItemComplete(index) {
		/**
		 * Remove a To Do from the list.
		 * @index = array index
		 **/

		// Toggle the completed flag
		Model.toggleItemComplete(index);

		// Refresh the count
		View.updateToDoCount();
	}
};

var App = {
	// Application Constructor
	initialize: function () {
		this.bindEvents();
	},

	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function () {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function () {
		App.receivedEvent('deviceready');
		// Cordova / PhoneGap platform is ready.
		console.log("Platform ready.");
		// Start the App Logic
		Controller.init();
	},

	// Act on a Received Events
	receivedEvent: function (id) {
		console.log("Received Event: " + id);
	}
};

App.initialize();

