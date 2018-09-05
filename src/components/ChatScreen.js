import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'

import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import TypingIndicator from './TypingIndicator'
import WhoIsOnline from './WhoIsOnline'
import UserTotalCounter from './UserTotalCounter'

export default class ChatScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      currentUser: {},
      currentRoom: {},
      usersWhoAreTyping: []
    }
  }


  componentDidMount = () => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:e2068def-9683-46dd-bc93-d325e7e677d3',
      userId: this.props.username,
      tokenProvider: new Chatkit.TokenProvider({
        url: window.location.href + 'authenticate'
      })
    })


    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId: 15200487,
          messagesLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            onUserStartedTyping: user => {
              console.log(user.name + ' started typing')
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              })

            },
            onUserStoppedTyping: user => {
              console.log(user.name + ' stopped typing')
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              })
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()


          }
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  sendMessage = (text) => {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text
    })
  }

  sendTypingEvent = () => {

    this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.log(error))

  }


  render() {


    const msgsScrollBar = {
      'height': '55vh',
      'overflowY': 'scroll'
    };

    const usersScrollBar = {
      'height': '55vh',
      'overflowY': 'scroll',
      'direction': 'rtl'
    };

    return (

      <section className="section">

        <div className="row">

          <div className="col l3 s12">

            <div className="card-panel black white-text center" style={{ 'height': '90vh' }} >

              <i className="material-icons">insert_emoticon</i>
              <h5>Chat Visitors</h5>
              <h3 className="count">
                <UserTotalCounter users={this.state.currentRoom.users} />
              </h3>
              <div className="progress white">
                <div className="determinate red" style={{ 'width': '60%' }}></div>
              </div>

              <div style={usersScrollBar}>
                <WhoIsOnline users={this.state.currentRoom.users} />

              </div>
              {console.log(window.location.href)}
            </div>

          </div>



          <div className="col l9 s12">

            <div className=" card-panel red" style={{ 'height': '90vh' }} >


              <div className="row">


                <div className="col s12">


                  <div className="card-panel black white-text" style={{ 'height': '65vh' }} >
                    <div className="row" style={msgsScrollBar} >
                      <MessageList currentUser={this.state.currentUser} messages={this.state.messages} />
                      <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                    </div>
                  </div>


                  {/* <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} /> */}

                  <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                </div>

              </div>

            </div>


          </div>

        </div>
      </section>
    )
  }
}
