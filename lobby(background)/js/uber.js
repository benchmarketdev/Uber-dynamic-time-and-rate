// Uber API Constants
// Security note: these are visible to whomever views the source code!
var   uberClientId = "tx42md1_WiYIzg_I0Cyc5YopjdIYtEe2"
	, uberClientSecret = "QeyWOZyRm5-wSTcbyekkS7dT6nt78F8mB7n1oXrO"
	, uberServerToken = "XuiT9QBMsNqWc3qKbiirJDqCXySCe1K9XrF-Y23A"
	, uberRequestscope = "hIIKQ3ghY1SAmqn6cxyJX6Q9g3law7Gx"
// Create variable to store timer
var timer;
var index = 0;
console.log("=====1=======");
// Create variables to store latitude and longitude
var   userLatitude// = 40.712784//start_Latitude
	, userLongitude// = -74.004319//start_Longitude
	, partyLatitude = 41.028835//end_Latitude//41.028835, -73.761596
	, partyLongitude = -73.761596;//end_Longitude//1 Dekalb Avenue, White Plains, NY
// Create variable to store timer
var timer;
// Great resource: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
navigator.geolocation.watchPosition(function(position) {
	//Update latitude and longitude
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
	console.log(userLatitude);
	console.log(userLongitude);
	// Create timer if needed
	// Once initialized, it will fire every 60 seconds as recommended by the Uber API
	// We only create the timer after we've gotten the user's location for the first time 
	if (typeof timer === typeof undefined) {
		timer = setInterval(function() {
			console.log("3...");
			getEstimatesForUserLocation(userLatitude, userLongitude);
		}, 60000);

		// Query Uber API the first time manually
		getEstimatesForUserLocation(userLatitude, userLongitude);
	}
});

function getEstimatesForUserLocation(latitude,longitude) {
  console.log("Requesting updated rate estimate...");
  $.ajax({
	type: "GET",
    url: "https://api.uber.com/v1.2/estimates/price",
    header: {
		"Access-Control-Allow-Origin": "https://kozlovskydanila86.000webhostapp.com",
		"Access-Control-Allow-Headers": "Token " + uberServerToken,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"    
    },
    data: { 
    	start_latitude: latitude,
    	start_longitude: longitude,
    	end_latitude: partyLatitude,
    	end_longitude: partyLongitude,
    	server_token: uberServerToken
    },
    success: function(result) {
    	console.log(JSON.stringify(result));

    	// 'results' is an object with a key containing an Array
    	var data = result["prices"]; 
    	console.log(data);
    	var length = data.length;
    	var localized_display_name = "UberX";
    	var id=0;
    	for(var i=0;i<length;i++){
    	    if(data[i]["localized_dispaly_name"]==localized_display_name){
    	        id=i;
    	    }
    	}
		var duration = data[id]["duration"];
		var distance = data[id]["distance"];
		var low_estimate = data[id]["low_estimate"];
		var high_estimate = data[id]["high_estimate"];
		var estimate = parseInt((low_estimate + high_estimate) / 2) ;
		if(distance !== 0){ 
		    var rate = estimate / distance;
		}
		console.log(duration);
    	console.log(rate);
    	var times = duration/60 -index;
    	if(times !== 0){
		    $("#time").html(times + " mins");
    	}
		$("#rate").html("$" + rate.toFixed(2) + "/mile");
		index++;
	},
	error: function(err){
		console.log(JSON.stringify(err));
	}
  });
}

