import React, { Component } from 'react'

export default class MessageList extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map((message, index) => (
          <li key={index}>
            <div>
              <p>{message.senderId}: {message.text}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
