## Refreshing Time Estimates

[![](http://i.imgur.com/j7RhKTE.jpg)](http://i.imgur.com/j7RhKTE.jpg)

Uber's API recommends refreshing estimates every 60 seconds. To do so, we'll use JavaScript's built-in timer functions.

Start by adding `var timer;` _outside_ of the `watchPosition` callback.

Storing the timer outside of the callback allows us to ensure that a new timer isn't created each time `watchPosition` updates latitude and longitude.

__Note:__ There are different ways to handle the timer but we're using this implementation for code simplicity.

Next, in the `watchPosition` callback, check for the existence of the `timer` object. If one hasn't been created yet, generate the `timer` using `setInterval`. Make sure to call `getEstimatesForUserLocation` once separately, since our `timer` won't fire for at least 60 seconds.

Here's what our code looks like now:

```js
// Create variable to store timer
var timer;

navigator.geolocation.watchPosition(function(position) {
    // Update latitude and longitude
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;

  // Create timer if needed
  // Once initialized, it will fire every 60 seconds as recommended by the Uber API
  // We only create the timer after we've gotten the user's location for the first time 
  if (typeof timer === typeof undefined) {
    timer = setInterval(function() {
        getEstimatesForUserLocation(userLatitude, userLongitude);
    }, 60000);

    // Query Uber API if needed
    getEstimatesForUserLocation(userLatitude, userLongitude);
  }
});
```

> Code check: [06-refresh-estimates](https://github.com/Thinkful/uber-api-guide/tree/master/app/06-refresh-estimates)