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
var   userLatitude = 41.028835
	, userLongitude = -73.761596
	, partyLatitude = 41.028835
	, partyLongitude = -73.761596;//1 Dekalb Avenue, White Plains, NY
// Create variable to store timer
var timer;
navigator.geolocation.watchPosition(function(position) {
	//Update latitude and longitude
	console.log(userLatitude);
	console.log(userLongitude);
	if (typeof timer === typeof undefined) {
		timer = setInterval(function() {
			console.log("3...");
			getEstimatesForUserLocation(userLatitude, userLongitude);
		}, 3000);

		// Query Uber API the first time manually
		getEstimatesForUserLocation(userLatitude, userLongitude);
	}
});

function getEstimatesForUserLocation(latitude,longitude) {
  console.log("Requesting updated rate estimate...");
  $.ajax({
	type: "GET",
    url: "https://api.uber.com/v1.2/products",
    header: {
		"Access-Control-Allow-Origin": "https://kozlovskydanila86.000webhostapp.com",
		"Access-Control-Allow-Headers": "Token " + uberServerToken,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"    
    },
    data: { 
    	latitude: partyLatitude,
    	longitude: partyLongitude,
    	server_token: uberServerToken
    },
    success: function(result) {
    	console.log(JSON.stringify(result));

    	// 'results' is an object with a key containing an Array
    	var data = result["products"]; 
    	console.log(data);
    	var display_name = "UberX";
    	var id=0;
    	for(var i=0;i<length;i++){
    	    if(data[i]["dispaly_name"]==display_name){
    	        id=i;
    	    }
    	}
		var cost_per_distance = data[id]["price_details"]["cost_per_distance"];
// 		var cost_per_distance = 1111;
		console.log(cost_per_distance);
		$("#rate").html("$" + cost_per_distance.toFixed(2) + "/mile");

	},
	error: function(err){
		console.log(JSON.stringify(err));
	}
  });
 $.ajax({
	type: "GET",
    url: "https://api.uber.com/v1.2/estimates/time",
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
    	var data = result["times"]; 
    	console.log(data);
    	var localized_display_name = "UberX";
    	var id=0;
    	for(var i=0;i<length;i++){
    	    if(data[i]["localized_dispaly_name"]==localized_display_name){
    	        id=i;
    	    }
    	}
		var estimate = data[id]["estimate"];
		console.log(estimate);
		console.log(estimate);
        $("#time").html(parseInt(estimate / 60) + "mins");
	},
	error: function(err){
		console.log(JSON.stringify(err));
	}
  });
}

