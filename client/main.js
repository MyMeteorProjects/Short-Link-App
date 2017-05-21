import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => { // making sure that a user can only visit authenticated page
  const isAuthenticated = !!Meteor.userId(); // double flip to make the user id into boolean true.
  onAuthChange(isAuthenticated);
});

// Tracker.autorun(() => {
//   const name = Session.get('name') // this method allows you to fetch from the set method
//   console.log('Name: ', name);
// })
//
// Session.set('name', 'judah') // seesion is a client side package and is takes to args- key and val

Meteor.startup(() => {
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'));
});
