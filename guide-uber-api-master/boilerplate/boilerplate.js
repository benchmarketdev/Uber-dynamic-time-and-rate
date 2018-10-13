/* 
 * Create and send an AJAX (Asynchronous JavaScript and XML)
 * request to Uber using the jQuery library.
 * 
 * Uber's documentation: https://developer.uber.com/v1/endpoints/
 */
jQuery.ajax({
  // Set the type of this HTTP request to 'GET'
  type: "GET",
  // Set the endpoint that we're trying to reach at Uber
  url: "https://api.uber.com/v1/estimates/time",
  // Add headers (metadata) describing the request
  // Example headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers 
  headers: {
    "Authorization": "Token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  // Set data to send with the request
  // jQuery encodes this data and appends it to the URL
  data: {
    // TODO: Add data
  },
  // What to do when we get data back from Uber
  success: function(result) {
    console.log(result);
  }
});