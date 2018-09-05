import React, { Component } from 'react'

export default class WhoIsOnline extends Component {
  render() {

    if (this.props.users) {
      return (
        <ul>
          {this.props.users.map((user, index) => (
            <li key={index}>{user.name} ({user.presence.state})</li>
      ))}
        </ul>
      ) 
    } else {
      return <p>Loading...</p>
    }
  }
}
