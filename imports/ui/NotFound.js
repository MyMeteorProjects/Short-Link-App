import React from 'react';
import { Link } from 'react-router';

//stateless functional component
export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 - Page Not Found..</h1>
          <p>Hmmmm... Sorry, we couldent find what you were looking for</p>
          <Link to="/" className="button button--link">Head Back Home</Link>
        </div>
      </div>
    );
}
