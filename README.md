### A simple SPA implemented with both AngularJS and Angular 4
##### Notes:

The structure of project:
* Code of [client] is the front end implemented with **Angular 4** framework
* Code of [public] is the front end implemented with **AngularJS** framework
* Code of [src] is the backend API implemented with ExpressJS.

>How to run:

> **The very first action: please run `npm install` in both proj *root* path and *client* path under the root path. Because Angular 4 part was build with Angual-cli proj starter separately.**

1. In terminal, go to the root folder of project, run `npm run-script db` to initialize the database
2. Then run `npm start` to start the ExpressJS first.
3. Open your browser and input `http://localhost:5000`. This will lead you to the AngularJS pages.
4. Open another Terminal window, cd the **client** folder and run `npm run-script ngrun`, 
5. Open your browser and input `http://localhost:4200`this will start the Angular 4 application.

Both application acts in the same way through different in the back.  :metal: 
