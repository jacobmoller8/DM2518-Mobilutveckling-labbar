// JavaScript code for the Arduino Beacon example app.

// Application object.
var app = {};
const spelhallenList = document.querySelector("#spelhallen-list");
const spelhallenPhoto = document.querySelector("#spelhallenPhoto");

const musiksalenList = document.querySelector("#musiksalen-list");
const musiksalenPhoto = document.querySelector("#musiksalenPhoto");

const konsthallenList = document.querySelector("#konsthallen-list");
const konsthallenPhoto = document.querySelector("#konsthallenPhoto");

const form = document.querySelector("#user-info");

var userId = "";

// Regions that define which page to show for each beacon.
app.beaconRegions = [
	{
		id: "spelhallen",
		uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
		major: 3560,
		minor: 36810
	},
	{
		id: "musiksalen",
		uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
		major: 57356,
		minor: 14220
	},
	{
		id: "konsthallen",
		uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
		major: 57272,
		minor: 20467
	}
];

// Currently displayed page.
app.currentPage = "page-default";

app.initialize = function () {
	document.addEventListener("deviceready", app.onDeviceReady, false);
	app.gotoPage(app.currentPage);
};

// Called when Cordova are plugins initialised,
// the iBeacon API is now available.
app.onDeviceReady = function () {
	// Specify a shortcut for the location manager that
	// has the iBeacon functions.
	window.locationManager = cordova.plugins.locationManager;

	// Start tracking beacons!
	app.startScanForBeacons();
};

app.startScanForBeacons = function () {
	//console.log('startScanForBeacons')

	// The delegate object contains iBeacon callback functions.
	var delegate = new cordova.plugins.locationManager.Delegate();

	delegate.didDetermineStateForRegion = function (pluginResult) {
		//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	};

	delegate.didStartMonitoringForRegion = function (pluginResult) {
		//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
	};

	delegate.didRangeBeaconsInRegion = function (pluginResult) {
		//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
		app.didRangeBeaconsInRegion(pluginResult);
	};

	// Set the delegate object to use.
	locationManager.setDelegate(delegate);

	// Start monitoring and ranging our beacons.
	for (var r in app.beaconRegions) {
		var region = app.beaconRegions[r];

		var beaconRegion = new locationManager.BeaconRegion(
			region.id,
			region.uuid,
			region.major,
			region.minor
		);

		// Start monitoring.
		locationManager
			.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done();

		// Start ranging.
		locationManager
			.startRangingBeaconsInRegion(beaconRegion)
			.fail(console.error)
			.done();
	}
};

// Display pages depending of which beacon is close.
app.didRangeBeaconsInRegion = function (pluginResult) {
	//console.log('numbeacons in region: ' + pluginResult.beacons.length)

	// There must be a beacon within range.
	if (0 === pluginResult.beacons.length) {
		return;
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = pluginResult.beacons[0];

	// The region identifier is the page id.
	var pageId = pluginResult.region.identifier;

	//console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)

	// If the beacon is close and represents a new page, then show the page.
	if (
		beacon.proximity === "ProximityImmediate" &&
		app.currentPage === "page-default" &&
		form.name.value !== "" &&
		form.what.value !== ""
	) {
		app.gotoPage(pageId);
		console.log(pageId);
		spelhallenList.innerHTML = "";
		musiksalenList.innerHTML = "";
		konsthallenList.innerHTML = "";

		db.collection(pageId)
			.add({
				name: form.name.value,
				what: form.what.value,
				when: firebase.firestore.Timestamp.fromDate(new Date())
			})
			.then(ref => {
				window.userId = ref.id;
			});

		db.collection(pageId)
			.orderBy("when")
			.get()
			.then(resp => {
				resp.docs.forEach(doc => {
					console.log(doc.data().name);
					renderRoom(doc, pageId);
				});
			});
		return;
	}

	// If the beacon represents the current page but is far away,
	// then show the default page.
	if (
		(beacon.proximity === "ProximityFar" ||
			beacon.proximity === "ProximityNear") &&
		app.currentPage === pageId
	) {
		app.gotoPage("page-default");
		leaveList(pageId);
		return;
	}
};

app.gotoPage = function (pageId) {
	app.hidePage(app.currentPage);
	app.showPage(pageId);
	app.currentPage = pageId;
};

app.showPage = function (pageId) {
	document.getElementById(pageId).style.display = "block";
};

app.hidePage = function (pageId) {
	document.getElementById(pageId).style.display = "none";
};

// Set up the application.
app.initialize();

function renderRoom(doc, pageId) {
	let li = document.createElement("li");
	let nameInList = document.createElement("span");

	li.setAttribute("data-id", doc.id);
	li.setAttribute("class", "list-group-item");
	nameInList.textContent = doc.data().name;

	li.appendChild(nameInList);

	if (pageId === "spelhallen") {
		spelhallenList.appendChild(li);
	} else if (pageId === "musiksalen") {
		musiksalenList.appendChild(li);
	} else if (pageId === "konsthallen") {
		konsthallenList.appendChild(li);
	}
}

function leaveList(pageId) {
	db.collection(pageId)
		.doc(window.userId)
		.delete();
}

spelhallenPhoto.addEventListener("click", e => {
	refreshSpelhallen();
});

musiksalenPhoto.addEventListener("click", e => {
	refreshMusiksalen();
});

konsthallenPhoto.addEventListener("click", e => {
	refreshKonsthallen();
});

function refreshSpelhallen() {
	spelhallenList.innerHTML = "";
	db.collection("spelhallen")
		.orderBy("when")
		.get()
		.then(resp => {
			resp.docs.forEach(doc => {
				console.log(doc.data().name);
				renderRoom(doc, "spelhallen");
			});
		});
}

function refreshMusiksalen() {
	musiksalenList.innerHTML = "";
	db.collection("musiksalen")
		.orderBy("when")
		.get()
		.then(resp => {
			resp.docs.forEach(doc => {
				console.log(doc.data().name);
				renderRoom(doc, "musiksalen");
			});
		});
}

function refreshKonsthallen() {
	konsthallenList.innerHTML = "";
	db.collection("konsthallen")
		.orderBy("when")
		.get()
		.then(resp => {
			resp.docs.forEach(doc => {
				console.log(doc.data().name);
				renderRoom(doc, "konsthallen");
			});
		});
}
/*
db.collection("spelhallen")
  .get()
  .then(resp => {
    resp.docs.forEach(doc => {
      console.log(doc.data().name);
      renderSpelhallen(doc);
    });
  });
*/
