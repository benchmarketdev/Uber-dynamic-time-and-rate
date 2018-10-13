## Finding the User's Location

We can request the user's GPS coordinates by using the [Geolocation Web API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) that's built into every modern browser.

You need to use JavaScript to get the Geolocation Web API working. Before writing any code, we need to create a JavaScript file (which we're calling `uber.js`) and link it to our `index.html` file.

We'll be using jQuery to communicate with the Uber API, so we'll add a script element for jQuery as well.

Just before the `</body>` tag, insert the following code:

```html
<script src="js/jquery-2.1.1.min.js"></script>
<script src="js/uber.js"></script>
```

__Note:__ Order matters: make sure you load jQuery before loading your custom script. Also, make sure you've saved jQuery in your `/js` folder.

> Code check: [03-javascript-ready](https://github.com/Thinkful/uber-api-guide/tree/master/app/03-javascript-ready)

#### Locating the User

The Uber API documentation recommends requesting updated time estimates every minute; since we want to show accurate time estimates we'll be using the Geolocation API's [watchPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation.watchPosition) function. This will enable us to submit the latest GPS coordinates to the Uber API each time we make a request.

In `uber.js`, create variables to store the user's location data, and then update those variables with the latest values after calling the [watchPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation#Watching_the_current_position) function. Your code should look like this:

```js
// create placeholder variables
var userLatitude
	, userLongitude;

navigator.geolocation.watchPosition(function(position) {
	// Update latitude and longitude
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;
});
```

__Check Your Code:__ To make sure you're receiving reasonable location data, you can add a `console.log(position)` statement in the `function(position)` callback, and check your JavaScript Console while viewing the page in your browser. Your code should look like this (we just added the `console.log(position)`:

```js
// create placeholder variables
var userLatitude
    , userLongitude;

navigator.geolocation.watchPosition(function(position) {
    console.log(position);

    // Update latitude and longitude
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
});
```


#### [Where The Party At](https://www.youtube.com/watch?v=G9-RWXfdrL8)

At this point, you can also add location data for your end destination. Just add `partyLatitude` and `partyLongitude`, like so:

```js
var userLatitude
	, userLongitude
	, partyLatitude = 40.7283405
	, partyLongitude = -73.994567;
```

It might be a good time to load some vintage 2001 [tunes](https://www.youtube.com/watch?v=G9-RWXfdrL8), too, if you're so inclined.