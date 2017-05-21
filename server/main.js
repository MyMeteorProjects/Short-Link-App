//main server

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const Link = Links.findOne({ _id }); //es6 syntax same as _id: _id

    if (Link) {
      res.statusCode = 302;
      res.setHeader('Location', Link.url);
      res.end();
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }

  });
}); // END STARTUP
//   WebApp.connectHandlers.use((req, res, next) => { //this is a custom middleware, have to give these 3 args to the function
//     console.log('This is from my custom middleware');
//     console.log(req.url, req.method, req.headers, req.query);
//     next(); //if not calling next() the app will get stuck
//
// //exploring the response object

    //set HTTP status code
//    res.statusCode = 404;
    //set HTTP headers
//    res.setHeader('my-custom-header', 'does it work?');
    //set HTTP body
//    res.write('<h1>This is my middleware at work</h1>');
    //end HTTP request
//    res.end();






// code to run on server at startup /* simple schema reference */ this should be inside Meteor.startup
// const petSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 200
//   }
// });
//
// petSchema.validate({
//   name: 'mikel'
// })
