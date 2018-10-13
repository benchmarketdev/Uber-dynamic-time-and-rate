## Getting Started with the Uber API

Now that you've registered your app with Uber, let's dig into the API's [endpoints](https://developer.uber.com/v1/endpoints/?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link).

__Note:__ "Endpoint" is a generic term for specific web services: in this case, JSON-formatted data about Uber that can be accessed via regular URLs.

[![](http://i.imgur.com/LXAHh5P.png)](https://developer.uber.com/v1/endpoints/?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link)

The Uber API provides different endpoints that can be used to pull information about Uber users, products, price and __time estimates__. For our app, we plan to show our users how far away they are from pick-up by an Uber vehicle, which is included in both the [Time Estimates](https://developer.uber.com/v1/endpoints/#time-estimates?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) and the [Price Estimates](https://developer.uber.com/v1/endpoints/#price-estimates?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) endpoints.

Later on, we'd like to add the estimated Uber ride price. Because of this, we'll use the [Price Estimates endpoint](https://developer.uber.com/v1/endpoints/#price-estimates?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link).

As mentioned earlier, endpoints are nothing more than regular URLs that return some JSON data. In order to use endpoints, you sometime need to provide parameters. Parameters are used to pass information to the endpoint so that you can get the answer you want. In the "Google Maps" world, you can imagine an endpoint requiring an address and, in response, returning information about said address (such as latitude and longitude).

The Uber [Price Estimates endpoint](https://developer.uber.com/v1/endpoints/#price-estimates?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) required a few parameters:

- Authorization (an OAuth 2.0 bearer token or `server_token`)
- `start_latitude`
- `start_longitude`
- `end_latitude`
- `end_longitude`

Let's start by getting our user's GPS coordinates (latitude and longitude) so that we can provide them to the Uber API.