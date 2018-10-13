// Uber API Constants
// Security note: these are visible to whomever views the source code!
var uberClientId = "tx42md1_WiYIzg_I0Cyc5YopjdIYtEe2"
	,uberClientSecret = "QeyWOZyRm5-wSTcbyekkS7dT6nt78F8mB7n1oXrO"
	,uberServerToken = "XuiT9QBMsNqWc3qKbiirJDqCXySCe1K9XrF-Y23A"

var timer;
console.log("=====1=======");
//Create another sandbox api
 var userLatitude = 41.028835
	, userLongitude = -73.761596
	, partyLatitude = 41.028835
	, partyLongitude = -73.761596;
navigator.geolocation.watchPosition(function(position) {
	if (typeof timer === typeof undefined) {
//		console.log("2...");
		timer = setInterval(function() {
//			console.log("3...");
			getEstimatesForUserLocation(userLatitude, userLongitude);
		}, 60000);

		// Query Uber API the first time manually
		getEstimatesForUserLocation(userLatitude, userLongitude);
	}
});

function getEstimatesForUserLocation(latitude,longitude) {
	console.log("Requesting updated time estimate...");
  $.ajax({
	type: "GET",
    url: "https://api.uber.com/v1.2/estimates/time",
    header: {
		"Access-Control-Allow-Origin": "https://kozlovskydanila86.000webhostapp.com",
		"Access-Control-Allow-Headers": "Token " + uberServerToken,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"    
		//"Authorization": "Token " + uberServerToken,
    },
    data: { 
    	start_latitude: latitude,
    	start_longitude: longitude,
    	server_token: uberServerToken
    },
    success: function(result) {
    	console.log(JSON.stringify(result));

    	// 'results' is an object with a key containing an Array
    	var data = result["times"]; 
    	console.log(data);
    	var estimate = data[0]["estimate"];
    	console.log(estimate);
    	if (typeof data != typeof undefined) {
    		// Sort Uber products by time to the user's location 
    		data.sort(function(t0, t1) {
    			return t0.duration - t1.duration;
    		});

    		// Update the Uber button with the shortest time
    		var shortest = data[0];
    		if (typeof shortest != typeof undefined) {
    			console.log("Updating time estimate...");
					$("#time").html(parseInt(estimate / 60.0) + " mins");
					// $("#rate").html("$" + "/mile");

    		}
    	}
	},
	error: function(err){
		console.log(JSON.stringify(err));
	}
  });
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
		var duration = data[0]["duration"];
		var distance = data[0]["distance"];
		var low_estimate = data[0]["low_estimate"];
		var high_estimate = data[0]["high_estimate"];
		var estimate = parseInt((low_estimate + high_estimate) / 2);
		var rate = estimate ;
    	console.log(rate);
		$("#rate").html("$" +rate.toFixed(2) );
	},
	error: function(err){
		console.log(JSON.stringify(err));
	}
  });
}

