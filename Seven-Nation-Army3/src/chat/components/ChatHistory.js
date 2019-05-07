import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/Chat.scss';
import MessageList from './MessageList.jsx';
import SendMessage from './SendMessage.jsx';
import ChatHeader from './ChatHeader.js';
import { getFirebase } from 'react-redux-firebase';

// TODO: Port Chat History from the Chat.html file to React
class ChatHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendName: " "
    };
    this.firebase = getFirebase();
  }

  componentDidLoad() {
    const friendRef = this.firebase.database().ref('root/sessions/-LdLRGh4fGk1rD5Zd_Np/players/' + this.props.friendID);
    friendRef.once("value").then(res => {
      if(res) {
        this.setState({friendName: res.val().username})
      }
    });
  }

  render() {
    return (
      <div className="chat">
        <ChatHeader 
          name = {this.state.friendName}
          totalMessages = "100"/>
        {/* <!-- end chat-header --> */}

        <div className="chat-history">
          <MessageList />
        </div>
        {/* <!-- end chat-history --> */}

        <SendMessage />
        {/* <!-- end chat-message --> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // console.log(state);
  roomData: state.chatRoom.roomData
});

export default connect(mapStateToProps)(ChatHistory);
