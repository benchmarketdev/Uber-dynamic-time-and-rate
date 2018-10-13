// Uber API Constants
var uberClientId = "YOUR_CLIENT_ID"
	, uberServerToken = "YOUR_SERVER_TOKEN";

// Create variables to store latitude and longitude
var userLatitude
  , userLongitude
  , partyLatitude = 40.7283405
  , partyLongitude = -73.994567;


navigator.geolocation.watchPosition(function(position) {
	// Update latitude and longitude
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;

    // Query Uber API if needed
	getEstimatesForUserLocation(userLatitude, userLongitude);
});

function getEstimatesForUserLocation(latitude,longitude) {
  $.ajax({
    url: "https://api.uber.com/v1/estimates/price",
    headers: {
    	Authorization: "Token " + uberServerToken
    },
    data: { 
      start_latitude: latitude,
      start_longitude: longitude,
      end_latitude: partyLatitude,
      end_longitude: partyLongitude
    },
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