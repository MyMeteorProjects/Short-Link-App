import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links', ]
const onEnterPublicPage = () => { // this function prevents authenticated user from reaching the public pages
  if(Meteor.userId()) { // it is called inside the JSX on the 'onEnter' att
    browserHistory.replace('/links')
  }
}
const onEnterPrivatePages = () =>{ //this also prevents unauthenticated users from reaching private pages
  if(!Meteor.userId()) { // it is called inside the JSX on the 'onEnter' att
    browserHistory.replace('/')
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;// this gets the page that the usin is in right now
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname); //this checks if a page is for authenticated users or not
  const isAuthenticatedPage = authenticatedPages.includes(pathname);//this checks if a page is for authenticated users or not

  if(isUnauthenticatedPage && isAuthenticated ){
    browserHistory.replace('/links')//pushes authenticated user to his links page
  } else if (isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/')//pushes a logged out user or not authenticated user back to the login page (root)
  }

//  console.log('isAuthenticated', isAuthenticated); //make sure that the user is authenticated
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePages}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePages}/>
  </Router>
);
