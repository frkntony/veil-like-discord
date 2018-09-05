import React, { Component } from 'react'
import UserNameForm from './components/UserNameForm'
import ChatScreen from './components/ChatScreen'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''

    }
  }

  onUsernameSubmitted = (username) => {
    fetch(`http://localhost:3001/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    })
      .then( (res) => {
        this.setState({ 
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch( (error) => {
        console.log(error)
      })
  }

  render() {

    if (this.state.currentScreen === 'WhatIsYourUsernameScreen'){
      return < UserNameForm onSubmit={this.onUsernameSubmitted} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen username={this.state.currentUsername} />
    }

    
  }
}

export default App
