# AjaxExplorer
The Super Endpoint Explorer (SEE) app will allow the end user to craft requests to a remote end-point by filling out various form fields, send the request and show the response, and save common request configurations for later playback. The form of the tool is roughly like the Chrome Extension called Postman or an OSX HTTP exploration like Paw but obviously less polished and feature laden.

### Information For The Grader

After saving a request, you have to click on the red title to load it again or click the X to delete it.

When more than 3 headers are added, you have to scroll to see the rest of them. The scrollbar might not show depending on the OS you're using.

For both the requests and the response boxes, the headers are displayed first and the then the payload, so simply scroll to see the whole response or request :)

The body should be in JSON format but an error message will let you know if it isn't.

There is no validation on the standard header values...please be merciful.

### Missing Features or Problems

Headers and payload might not be complete. We just display whatever's in the xhr object

Edge cases might have been missed...idk tho

### High Quality Sections

The saved list.

The UI

### Advanced Solution

We validated our HTML, and CSS and also our JS with ES6 option turned on

A non-minified version of our JS and CSS is available in the scripts and styles folders.

The minified versions are being loaded into the app.

Our UI is highly polished and responsive (there's an animation too!)

We added a clear button that resets the form fields.
