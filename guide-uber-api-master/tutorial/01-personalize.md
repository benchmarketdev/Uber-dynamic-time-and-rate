## Personalizing your Invitation

First things first: Let's create an invitation template using HTML and CSS.

At a minimum, your invite should include some info about when and where your party is taking place. Similar to the image you saw above.

If you don't want to start from scratch, you can customize our invitation template. To do this:
- Go to [the repo](https://github.com/Thinkful/guide-uber-api)
- Click "Download Zip"
- Open the zipped file
- Go to `app/01-static-invitation`
- Open `index.html` in your browser
- You can change the invitation design by modifying `app/01-static-invitation/css/style.css` as you see fit


## Getting an Address's Latitude and Longitude

If you want to create your own map, like we did in our example, you'll first need to get your party's address latitude and longitude. Here's how to do this:

1. On your computer, visit Google Maps
1. Search for an address
1. Right-click a location on the map
1. Select What's here?
1. Coordinates will appear either in or below the search box

![screen shot 2014-11-10 at 2 17 56 pm](https://cloud.githubusercontent.com/assets/791818/4981959/51690eac-690e-11e4-81f9-9e250d294016.png).

Next, to generate the map image, modify this URL by changing the latitude and longitude from the step above. In this example, our latitude is `40.725255` and our longitude is `-73.996842`:

```txt
 http://maps.googleapis.com/maps/api/staticmap?zoom=17&format=png&sensor=false&size=280x280&maptype=roadmap&style=element:geometry.fill|color:0xf4f4f4&markers=color:red|40.725255,-73.996842&scale=2
```

Here's the result:

![](http://maps.googleapis.com/maps/api/staticmap?zoom=17&format=png&sensor=false&size=280x280&maptype=roadmap&style=element:geometry.fill|color:0xf4f4f4&markers=color:red|40.725255,-73.996842&scale=2)


__Pro-tip__

For design: Use [Google Fonts](http://www.google.com/fonts) to find amazing (and free) fonts, [Unsplash](https://unsplash.com) for images, and play around with [Google's Styled Maps Wizard](http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html).

If you're starting from scratch: Make sure your invitation is mobile optimized and responsive. If you're not sure how to do this, you can join Thinkful's [Frontend Web Development Course](http://www.thinkful.com/web-development-course?utm_source=tf_uber_party_invite_guide&utm_medium=link&utm_campaign=tf_guides) to learn this and much more with one-on-one mentorship.



