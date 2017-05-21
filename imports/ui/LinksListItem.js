import React from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';
import FlipMove from 'react-flip-move';

export default class LinksListItem extends React.Component {
  constructor (props) { // have to call a constructor to create a state
    super(props); // have to call perant to initiate
    this.state = {
      justCopied: false // define what i want to set the statew for
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({justCopied: true}); //sets the state to success and copieng to clip board
      setTimeout(() => this.setState({justCopied: false}), 1000); // after a second return to original value
    }).on('error', () => {
      alert('Failed')
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats(){
    const visitMessage = this.props.visitedCount === 1? 'visit': 'visits' // this is an if statement reduced to one line that controlls the message before the number of visits
    let visitedMessage = null


    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
    }
    return (
      <p className="item__message">{this.props.visitedCount} - {visitMessage} {visitedMessage}</p>
    )
  }
  render() {
    return(
    
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}

        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied? 'Copied' : 'copy' /* this is basicly an if statment that checks the state of just copied and define the text in the button*/}
        </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
        }}>
          {this.props.visible? 'Hide' : 'Unhide'}
        </button>
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>

      </div>

    );
  }
};

LinksListItem.propTypes = { //validating the proptypes and making sure that they are required
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired, // analytics on the links
  lastVisitedAt: React.PropTypes.number  // analytics on the links
};
