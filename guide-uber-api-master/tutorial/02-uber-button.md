## Adding a Call-To-Action: Let's Take an Uber!

Uber provides ready-made images we can use to make our Uber button. [Click here to download the assets](https://d1a3f4spazzrp4.cloudfront.net/uberex/Uber_API_Design_Guidelines.zip). Uber also provides helpful [design guidelines](https://developer.uber.com/v1/design-guidelines/?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) offering rules of thumb for button placement and sizing.
![image](https://cloud.githubusercontent.com/assets/791818/4960551/445b202a-66c4-11e4-9949-6d068d900380.png)


#### Creating the Button

To start, we need to create a button container. This is where we'll have the actual button as well as live time estimates for the nearest Uber ride.

If you're using our template, under the map image, create a new div with a class of `button`.

```html
<div class="button"></div>
```

Notice we used a `div` rather than just an `img` tag. This is because we're planning to overlay the button with live time estimates to the nearest Uber ride.

Now let's actually load the Uber button image inside the `div`. 

- [Download and open the Uber assets](https://d1a3f4spazzrp4.cloudfront.net/uberex/Uber_API_Design_Guidelines.zip)
- Go to `Assets/Uber API Buttons/Grey/PNGs/2x` and choose the image you prefer
	- The main difference is each image's border-radius
- Copy this image into your project's `/img` folder

__Note:__ Depending on your invitation's style, you can choose either the black or grey buttons provided by Uber.

#### Styling the Button

It's time to make our button look good. To do this, we'll use the image you chose earlier and make it the `div`'s `background-image`. Here's how we do this:

```css
.button {
	background-image: url('../img/UBER_API_Button_2x_Grey_hard edge.png');
	background-size: cover;
	width: 280px;
	height: 44px;
	margin: 0 auto;
}
```

__Note:__ Because we're using the `background-image` property, we have to specify the width and height of the `.button` class; otherwise, the `div` won't appear on our invitation.

#### Adding Time Estimates

Next, we'll add a placeholder for the time estimate. Later in the tutorial,we'll update the placeholder text with real time estimates using the Uber API.

Create a paragraph inside the `<div class="button">` and assign it an `id=time`. We'll use the `id` to update the time using Javascript in a bit. Your button's HTML should now look like this:

```html
<div class="button">
	<p id="time">ESTIMATING TIME</p>
</div>
```

Note we still have to position the `p` in the `div` using CSS. Here's how we achieve this:

```css
#time {
	text-align: right;
	margin-top: 2%;
	padding-top: 12px;
	padding-right: 14px;
}
```

Here's how your invitation should look by now — notice the Uber button:

![image](https://cloud.githubusercontent.com/assets/791818/4960568/769589ea-66c4-11e4-8ef6-f11b5223ddd9.png)

> Code check: [02-static-uber-button](https://github.com/Thinkful/uber-api-guide/tree/master/app/02-static-uber-button)