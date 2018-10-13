## Parsing Uber API Results

#### Reading the JSON

In your browser console, if you click on the `Object` and then on `prices` you should see something like this:

```json
{
  "prices": [
    {
      "localized_display_name": "uberX",
      "duration": 352,
      "low_estimate": "8",
      "display_name": "uberX",
      "product_id": "b8e5c464-5de2-4539-a35a-986d6e58f186",
      "distance": 0.73,
      "surge_multiplier": 1,
      "estimate": "$8",
      "high_estimate": "8",
      "currency_code": "USD"
    },
    {
      "localized_display_name": "uberXL",
      "duration": 352,
      "low_estimate": "12",
      "display_name": "uberXL",
      "product_id": "1e0ce2df-4a1e-4333-86dd-dc0c67aaabe1",
      "distance": 0.73,
      "surge_multiplier": 1,
      "estimate": "$12",
      "high_estimate": "12",
      "currency_code": "USD"
    }
  ],
  etc...
}
```

Examining the response from the Uber API, we can see that there's a `prices` key which we can use to extract an array of Uber products.

#### Updating your App with Uber Data

Our app could show the different Uber products and their time estimates, but our app only needs one time estimate to update `p id=time`.

We'll need to `sort` the `data` array from shortest to longest, extract the shortest time estimate, and use jQuery to update `p id=time` with the number of minutes to pickup. Here's how you can do this:

```js
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
```

> Code check: [05-parsing-uber-api](https://github.com/Thinkful/uber-api-guide/tree/master/app/05-parsing-uber-api)

Here's what your screen should look like:
![screen shot 2014-11-10 at 4 02 25 pm](https://cloud.githubusercontent.com/assets/791818/4983693/e8794042-691c-11e4-9e61-516977ef1636.png)
