## Fetching Time Estimates from Uber

We now have 4 of the 5 query parameters we need in order to use the Uber [Price Estimates API](https://developer.uber.com/v1/endpoints/#price-estimates?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link):
- `userLatitude` and `userLongitude`
    - These will become `start_latitude` and `start_longitude` when calling the Uber endpoint
- `partyLatitude` and `partyLongitude`
    - These will become `end_latitude` and `end_longitude` when calling the Uber endpoint

The last parameter missing is the app authentication. Let's dive into this next!

#### Authenticating your App

The Uber Price Estimates API specifies that you can use an OAuth 2.0 bearer token or a `server_token`. In our case, we'll be using the `server_token` generated when we registered our app to authenticate.

__Note:__ Using an OAuth 2.0 bearer token would require our users to log in with their Uber accounts, and would grant us access to the [User Activity](https://developer.uber.com/v1/endpoints/#user-activity-v1-1?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) and [User Profile](https://developer.uber.com/v1/endpoints/#user-profile?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) endpoints. We won't focus on this today.

At the top of the `uber.js` file, add two variables to store the Uber `client_id` and the `server_token`:

```js
// Uber API Constants
var uberClientId = "YOUR_CLIENT_ID"
    , uberServerToken = "YOUR_SERVER_TOKEN";
```

__Warning:__ Your uberClientId and uberServerToken will be visible to anyone who views the source code for your web app once it's published on the internet. To keep them 100% private, you would need to do this on the server (we won't cover server-side requests today).

__Note:__ We'll be using the `uberClientId` next, in the deep linking section.

#### Getting Data from the API

Since the `userLatitude` and the `userLongitude` will be changing as the user moves (e.g. walking down the street) we'll have to request Uber data repeatedly. In order to simplify our code, we're going to create a separate function to call the Uber API: `getEstimatesForUserLocation(latitude,longitude)`.

We'll use jQuery's [ajax](http://api.jquery.com/jquery.ajax/) method to request time estimates from the Uber API. Your Ajax request should look like this:

```js
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
        console.log(result);
    }
  });
}
```

Within the `watchPosition` callback, call `getEstimatesForUserLocation(userLatitude, userLongitude)`.

Here's our `uber.js` code so far:

```js
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
      console.log(result);
    }
  });
}
```

> Code check: [04-fetching-time-estimates](https://github.com/Thinkful/uber-api-guide/tree/master/app/04-fetching-time-estimates)

In this code check, if you open your console in your browser, you should see something like this.

![screen shot 2014-11-10 at 3 51 47 pm](https://cloud.githubusercontent.com/assets/791818/4983490/6a80d5d4-691b-11e4-98ca-2ad76d5831a5.png)

If you see a `401` error (`No 'Access-Control-Allow-Origin' header is present on the requested resource.`) in the console, make sure you've added an `Origin URI` to your app on your Uber [Manage Apps](https://login.uber.com/applications?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) dashboard. In our example, we're using port `8000` for the URL `http://localhost:8000/app/04-fetching-time-estimates/`). This port needs to be the same as the one you have in your Uber app settings (where `Origin URI` should equal `http://localhost:8000`). If you change this, you might need to generate a new `server_token` and then update `uber.js` with the new value.

__Note:__ To run this code check, you'll need to make sure you're using a server. On a Mac, you can do this by running `python -m SimpleHTTPServer`. If you're on windows, try doing this by installing [Mongoose](https://code.google.com/p/mongoose/). Also, if you get an