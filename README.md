angular-node-rest-crud
======================

A basic project showing the integration of AngularJS and node.js for a simple CRUD-application plus search. It basically shows a list of cities and allows the user to add a new city and edit/delete the existing ones.

It was build with the following aims:

* use AngularJS and node.js for a backend-driven application
* use Bootstrap for a decent UI (although it is very basic)
* build a REST application that properly uses all HTTP methods for the actions (CRUD)
* include a basic search
* render initial server-side data
* keep code clean and simple
* add unit test for entire client-side JS via Karma/Jasmine (code coverage > 90%)
* use max. 100 lines of JavaScript (for the application logic)

The app doesn't use a database, instead just an array of simple JSON-objects is passed around. But the basic structure would make it very easy to add a database, e.g. MongoDB. The server-side data is rendered via EJS templates. It gets removed as soon as Angular fetched all necessary data. While this works fine here (and supports SEO) I doubt that this makes sense for larger datasets / projects.

I didn't manage to reach the "100 lines of code" aim, although it is not far from that and generally I prefer readability to optimization. It would certainly be possible to reduce the code base below 100 lines (TODO).

Also, I want to add drag'n'drop support and search autocomplete in the future.
