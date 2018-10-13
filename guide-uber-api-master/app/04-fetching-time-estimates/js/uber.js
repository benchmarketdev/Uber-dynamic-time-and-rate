// Uber API Constants
var uberClientId = "p-33mbWLR20jI9GhUK-4tNxAglAFs59K"
	, uberServerToken = "ZP3ltEKgneM27lrGQrAoyPk7nUb7Bzq3ELygMw7x";

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
    url: "https://api.uber.com/v1.2/estimates/price",
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
      console.log(result);
    }
  });
}