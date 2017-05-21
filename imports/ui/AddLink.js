import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal'

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false, // this is the initial state for the add link modal which will be changed on button click
      error: ''
    };
  }

  onSubmit(e){
    const url = this.state.url

    Meteor.call('links.insert', url, (err, res) => {
      if(!err) {
        this.handaleModalClose()
      } else {
        this.setState({error: err.reason });
      }
    })
    e.preventDefault();
      //Links.insert({ url, userId: Meteor.userId() }); // this line add the user id to every link created to prevent other users from seeing his links
    }


  onChange(e){
    this.setState({
      url: e.target.value.trim()
    })
  }
  handaleModalClose () {
    this.setState({
      isOpen: false,
       url: '',
      error:''
    });
  }
  render () {
    return (
                              //underneath is the set state to the modal- a basic form in a light box to add link
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
           isOpen={this.state.isOpen}
           contentLabel="Add Link"
           onAfterOpen={() => this.refs.url.focus()/*this makes the added link focused*/}
           onRequestClose={this.handaleModalClose.bind(this)}
           className="boxed-view__box"
           overlayClassName="boxed-view boxed-view--modal"
           >
            <h1>Add Link</h1>

            {this.state.error ? <p>{this.state.error}</p>: undefined /*this is a turnery expression*/ }

            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                placeholder="URL"
                ref="url"
                value={this.state.url}
                onChange={this.onChange.bind(this)}/>

                <button className="button">Add Link</button>
                <button onClick={this.handaleModalClose.bind(this)} className="button button--secondary">
                  Cancel
                </button>
            </form>


          </Modal>
        </div>

    );
  }
};
