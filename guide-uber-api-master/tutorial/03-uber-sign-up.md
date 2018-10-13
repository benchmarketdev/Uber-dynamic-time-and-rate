## Signing Up for the Uber API

Now that our static invitation is complete, it's time to sign up for the Uber API at [developer.uber.com](https://developer.uber.com/?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link).

- Go to [developer.uber.com](https://developer.uber.com/?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link)
- Click "Manage Apps"
- [Log in](https://login.uber.com/login?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) with your existing Uber rider account, or create a new account


#### Registering your App

You're now ready to create your first Uber app. Choose [Register App](https://login.uber.com/applications/new?utm_source=thinkful&utm_campaign=party-invite-guide&utm_medium=link) and enter your app's details.

![Uber: Register App](https://cloud.githubusercontent.com/assets/791818/4960931/e0886274-66c8-11e4-943d-8de15574e642.png)

You'll need to provide:

- The name for your app (e.g. "Thinkful Party Invitation")
    - This name needs to be unique (you could use "Thinkful Party Invitation" + a random number)
- A description ("An Uber-powered party invitation to a party at Thinkful HQ in NYC!")

As an extra security measure, Uber whitelists the domains that are allowed to access their servers. To develop on your local computer, you'll need to set the "Origin URI" in the "Authentication" section of the page to `http://localhost:8000` (assuming your server is running on port 8000).

__Pro Tip:__ Your "Origin URI" should not contain a trailing slash. That is, `http://localhost:8000` works, while `http://localhost:8000/` might not.

Before clicking save, you'll also need to indicate whether you'd like to enroll in the Uber API Affiliate Program and whether you agree to the Uber API Terms of Use.

__Note:__ Under `List of Scopes`, do not select either option. Uber users' personal data isn't needed for this tutorial. If you do need Uber users' personal data for a later project, you'll need to provide a redirect URL and privacy policy URL before proceeding.

After saving your app, you'll see a Client ID, Server Token, and Secret. We'll come back to these and how to use them as we dig into the API.