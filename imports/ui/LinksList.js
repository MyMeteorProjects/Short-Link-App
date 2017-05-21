import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move'

import { Links } from '../api/links';
import LinksListItem from './LinksListItem'

export default class LinksList extends React.Component {

    constructor (props){
      super(props);
      this.state = {
        links:[]
      }
    }
    componentDidMount() { // lifecycle method
      this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('links'); // this is the subscription method the argument that is inserted is the same string name we gave the publication in the links API
        const links = Links.find({
          visible: Session.get('showVisible') //seesion is a client side package, it is used to store current state of code  and is takes to args- key and val
        }).fetch();
        this.setState({ links })
      });
      console.log('Component did mount LinksList');
    }
    componentWillUnmount(){  // lifecycle method
      console.log('Component will unmount LinksList');
      this.linksTracker.stop();
    }
    renderLinksListItems() {

      if(this.state.links.length === 0) {
        return (
          <div className="item">
            <p className="item__status-message">No Links Added</p>
          </div>
        )
      }
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id)
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      });
    }
    render() {
    return (
      <div>
        <div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    );
  }
};
