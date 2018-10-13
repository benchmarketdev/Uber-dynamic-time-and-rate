## Deep Linking to Uber

At this point, your app should be automatically updating the Uber button every minute with the time-to-pickup based on the user's location.

But so far our button doesn't _do_ anything.

First, wrap the button in an `<a>` tag so that your HTML looks something like this:

```html
<a href="#">
	<div class="button">
		<p id="time">ESTIMATING TIME</p>
	</div>
</a>
```

Next, we'll use jQuery to intercept the link: 

```js
$("a").click(function(event){
	// Intercepted Click Event
});
```

#### Deep Linking

Uber offers several [deep linking](https://developer.uber.com/v1/deep-linking?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) options if you're building a native app. Since our app is a web app, we'll use the [mobile web](https://developer.uber.com/v1/deep-linking/#mobile-web?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) deep linking infrastructure.

The minimum parameter we must include to redirect users to the Uber mobile web app (m.uber.com) is `client_id`.

You can specify over 20 additional parameters to customize your user's experience; in our case we'll specify as much information about the user and about the party as we can:

```js
$("a").click(function(event){
    // Redirect to Uber API via deep-linking to the mobile web-app
    var uberURL = "https://m.uber.com/sign-up?";

    // Add parameters
    uberURL += "client_id=" + uberClientId;
    if (typeof userLatitude != typeof undefined) uberURL += "&" + "pickup_latitude=" + userLatitude;
    if (typeof userLongitude != typeof undefined) uberURL += "&" + "pickup_longitude=" + userLongitude;
    uberURL += "&" + "dropoff_latitude=" + partyLatitude;
    uberURL += "&" + "dropoff_longitude=" + partyLongitude;
    uberURL += "&" + "dropoff_nickname=" + "Thinkful";

    // Redirect to Uber
    window.location.href = uberURL;
});
```

After constructing the URL, we're finally ready to redirect our users to Uber: `window.location.href = uberURL;`

You won't be able to sign-in on [m.uber.com](http://m.uber.com) on your desktop -- to fully test the deep-linking (and call an Uber in the process :) you'll need to fire up your iOS Simulator or upload your project to the web and access it from a mobile device:

[![](http://i.imgur.com/q4yG6Rr.png)]()