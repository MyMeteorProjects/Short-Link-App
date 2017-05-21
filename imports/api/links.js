import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links')

if(Meteor.isServer) {
  Meteor.publish('links', function () { //this is the publication, we need to subscribe to it in the LinksList component
    return Links.find({userId: this.userId}); //this is the exact syntax to get the links that were made by the specific user
  }); // this function makes the publish available only to the user who created it
}

// naming convension : resource.action example: email.archive
Meteor.methods({
  // secure insertion of new link to data base
  'links.insert'(url) {
    if(!this.userId){
      throw new Meteor.Error('Not Authorized');
    }

 //using the try catch method gives access to simple schema errors which are being swiched with meteor errors
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url});// es6 syntax equel to: url: url

    Links.insert({ // this is what the docs on the database hold
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },
  'links.setVisibility'(_id, visible) { // this is a meteor method that controlls the visibilty of the links
    if(!this.userId){ //making sure that the user is validated
      throw new Meteor.Error('Not Authorized'); //if not throwing an error
    }
    new SimpleSchema({ //validating the data with simple schema just like we did with the url above
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({_id, visible}); // es6 syntax

    Links.update({ // this updates the links and goes to the DB !!! passing in query object and the update object
      _id, // this is the qeury object
      userId: this.userId
    }, { //this is the update object
      $set: {visible}
    });
  },
  'links.trackVisit'(_id){
    new SimpleSchema({ //validating the data with simple schema just like we did with the url above
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id }); // es6 syntax

    Links.update({_id}, {
      $set:{ // this is a mongo command to add a time stamp to every time that a link has been visited
        lastVisitedAt: new Date().getTime()
      },
      $inc: { // this is a mongo command that increments the number of times the link have been visited.
        visitedCount: 1 // $inc is an object that takes key: value pair in this case the DB value and the number it incriments on.
      }
    })
  }
});
