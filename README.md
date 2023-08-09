# Building a custom login app

This README highlights how you can build a custom login app for your DHIS2 instance.

In general, we recommend that you try to use the existing login app and if desired customize the layout and styling with a html/css template. A custom login app may be applicable if you have significant additional functionality you want to include in your login app, or if you want to make use of your own custom components.

## Using the correct app type

The app platform now supports building login apps. Running a standard apps requires that a user be authenticated, as standard app use system and user settings that are behind the auth wall. An app with type `login_app` does not make any requests to resources that are behind an auth wall, so you do not need to authenticate to run the app.

The app type should be specified in your d2.config.js file. See example [example](./d2.config.js)

## Running your app

When you run the app locally you will need to provide the base url which you want to run the app against, but you will not need to authenticate. You can provide the base url with a environment variable, for example if you want to use http://localhost:8080 as your base url, you can run the app as follows `DHIS2_BASE_URL='http://localhost:8080' yarn start`

## Login UI Components

The DHIS2 UI library makes available various forms that can be used when building your custom login app. You can import these from @dhis2/ui, for example:

`import { LoginForm } from '@dhis2/ui'`

In order to provide full login functionality, these forms contain links within each other. In order for the links to work, you will need to implement

It is possible, however, to use the <LoginForm> component as a stand alone. In this case, in order to hide the links in the component, you should disable self registration and account recovery; these can be disabled in System Settings > Access.

## Setting up a router

In order to support the navigation functionality in the UI library's login components, you will need to set up a router, such that your app contains the appropriate pages to navigate to.

| endpoint                | required?                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                     | Always required. Your login form should be at this endpoint.                                                                                                                          |
| `/create-account`       | Required if you have enabled self registration. This is the page where users can fill out details to create an account.                                                               |
| `confirm-email`         | Required if you have enabled self registration and have configured email. This is where users will be sent to complete account creation after they receive a link sent to their email |
| `complete-registration` | Required if you have configured email. This is where users are directed after an account is created and allows them to finalize the account creation process.                         |
| `reset-password`        | Required if you have enabled account recovery. This is where users should be able to request a link to reset their password                                                           |
| `update-password`       | Required if you have enabled account recovery. This is where users reset their password (after they have received a link to do so in their email)                                     |

### Router: technical notes

We recommend using react-router's HashRouter to set up your router, but you are free to use other implementations. Because the DHIS2 backednd is not configured to recognize all possible endpoints, you should use a hash router and let your app load the appropriate page.

### Router: sample implementation

Below is a sample implementation of react-router-dom's HashRouter with the appropriate endpoints set up with the corresponding DHIS2 UI forms.

```
import {
    CompleteRegistrationForm,
    ConfirmEmailForm,
    CreateAccountForm,
    LoginForm,
    PasswordResetRequestForm,
    PasswordUpdateForm,
} from '@dhis2/ui'
import React from 'react'
import { HashRouter, Link, Navigate, Routes, Route } from 'react-router-dom'

const App = () => (
    <>
        <HashRouter>
            <Routes>
                <Route path="/" element={<ExpandedLoginForm />} />
                <Route path="/create-account" element={<CreateAccountForm />} />
                <Route
                    path="/complete-registration"
                    element={<CompleteRegistrationForm />}
                />
                <Route path="/reset-password" element={<PasswordResetRequestForm />} />
                <Route path="/update-password" element={<PasswordUpdateForm />} />
                <Route path="/confirm-email" element={<ConfirmEmailForm />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </HashRouter>
    </>
)

export default App
```

### Router: customization

When building your own login app, you will most likely want to swap out some of the standard DHIS2 components with your own components. You can of course do this. We encourage you to provide appropriate navigation back to the login page.

You can also add additional routes and link to these as you see fit by modifying (or creating you own) components for the other endpoints.
