var appState = Alloy.Models.appState;
var heroes = Alloy.Collections.heroes;

function generateRandomColor() {
	var c = (Math.floor(Math.random() * 255)) * 256 * 256 +
			(Math.floor(Math.random() * 255)) * 256 +
			(Math.floor(Math.random() * 255));
	c = c.toString(16);
	while (c.length < 6) {
		c = '0' + c;
	}
	return '#' + c;
}

// Contrived update function to modify the model
// associated with the clicked row
function modifyHero(e) {
	var model = heroes.at(e.index);
	model.set('name', model.get('name') + '+');

	// this should throw a warning since it is attempting
	// to sync on a collection that has no persistence.
	model.save();
}

// Update the model's counter and color, which in turn
// updates the UI via model binding
function updateState() {
	appState.set({
		counter: appState.get('counter') + 1,
		color: generateRandomColor()
	});
}

// Simulate a change in our model to trigger UI binding.
appState.trigger('change');
heroes.trigger('change');

// this should throw a warning since it is attempting
// to sync on a model that has no persistence.
appState.fetch();

$.index.open();