import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: false
    };
  }
  componentDidMount() { // lifecycle method
    this.tracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    });
  }
  componentWillUnmount(){  // lifecycle method
    this.tracker.stop();
  }

  render (){
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => { // this sets the checkbox to change the sessions state to show hidden links or visible links
          //  console.log(e.target.checked);//
            Session.set('showVisible', !e.target.checked) //if checked shows hidden links

          }}/>
          Show Hidden Links
        </label>
      </div>
      );
    }
  };
