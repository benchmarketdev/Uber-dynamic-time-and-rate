// Uber API Constants
// Security note: these are visible to whomever views the source code!
var uberClientId = "tx42md1_WiYIzg_I0Cyc5YopjdIYtEe2"
	, uberServerToken = "XuiT9QBMsNqWc3qKbiirJDqCXySCe1K9XrF-Y23A"
	,uberAccessToken = "JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAADJnTzLQoU6NWn16lRwCwzBsAAAAR8zbs3gSFZHdE6HIgoqOnqmz_JxjwWCHWgzmz7qwbNwskzKm5vAgmMyiLqYSUZ9pwu_Ijcyg7lIa8t6r6FvOxgL9vgTr7O3qcOoy3vYmT1W7bX1g5j2ZCW8wdmt8Di1770fkn5Gh0adXkqzRDAAAAEb0Rdo0YwXbadAX-iQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU";
	// Create variables to store latitude and longitude
var userLatitude = 37.775463
	, userLongitude =  -122.417566
	, partyLatitude  = 37.3382
	, partyLongitude = -121.8863;

// Create variable to store timer
var timer;

// Great resource: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
navigator.geolocation.watchPosition(function(position) {
	// Update latitude and longitude
	console.log("=====2=======");
	// userLatitude = position.coords.latitude;
	// userLongitude = position.coords.longitude;

	// Create timer if needed
	// Once initialized, it will fire every 60 seconds as recommended by the Uber API
	// We only create the timer after we've gotten the user's location for the first time 
	if (typeof timer === typeof undefined) {
		timer = setInterval(function() {
			getEstimatesForUserLocation(userLatitude, userLongitude);
		}, 5000);

		// Query Uber API the first time manually
		console.log("=====3=======");
		
		getEstimatesForUserLocation(userLatitude, userLongitude);
	}
});

function getEstimatesForUserLocation(latitude,longitude) {
	console.log("Requesting updated time estimate...");
  $.ajax({
	type: "GET",
    url: "https://api.uber.com/v1.2/estimates/price",
    headers: {
	// 	"Content-Type": "application/json",
		"Authorization": "Token " + uberServerToken,
	// 	// "Access-Control-Allow-Origin": "*",//https://kozlovskydanila86.000webhostapp.com/
	// 	// "Access-Control-Allow-Headers": "Content-Type"

    },
    data: { 
    	start_latitude: latitude,
    	start_longitude: longitude,
    	end_latitude: partyLatitude,
		end_longitude: partyLongitude,
		server_token: uberServerToken
	},
	dataType: "json",
    success: function(result) {
    	console.log(JSON.stringify(result));

    	// 'results' is an object with a key containing an Array
    	var data = result["prices"]; 
    	if (typeof data != typeof undefined) {
    		// Sort Uber products by time to the user's location 
    		data.sort(function(t0, t1) {
    			return t0.duration - t1.duration;
    		});

    		// Update the Uber button with the shortest time
    		var shortest = data[0];
    		if (typeof shortest != typeof undefined) {
    			console.log("Updating time estimate...");
				$("#time").html("IN " + Math.ceil(shortest.duration / 60.0) + " MIN");
    		}
    	}
    }
  });
}

$("a").click(function(event){
	// Redirect to Uber API via deep-linking to the mobile web-app
	var uberURL = "https://login.uber.com/oauth/v2/authorize?";
	

	// Add parameterss
	uberURL += "client_id=" + uberClientId;
	if (typeof userLatitude != typeof undefined) uberURL += "&" + "pickup_latitude=" + userLatitude;
	if (typeof userLongitude != typeof undefined) uberURL += "&" + "pickup_longitude=" + userLongitude;
	uberURL += "&" + "dropoff_latitude=" + partyLatitude;
	uberURL += "&" + "dropoff_longitude=" + partyLongitude;
	uberURL += "&" + "dropoff_nickname=" + "Thinkful";

	// Redirect to Uber
	window.location.href = uberURL;
});
