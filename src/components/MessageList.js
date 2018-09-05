import React, { Component } from 'react'

export default class MessageList extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.currentUser.id)}
        <ul>
          {this.props.messages.map((message, index) => {

            let msg

            if (message.senderId === this.props.currentUser.id) {

              msg =
                <li key={index}>
                  <div>
                    <p>You: {message.text}</p>
                  </div>
                </li>

            } else {
              msg =
                <li key={index}>
                  <div>
                  
                    <p><i className="material-icons prefix">account_circle</i> {message.senderId}: {message.text}</p>
                  </div>
                </li>
            }

            return msg


          })}
        </ul>
      </div>
    )
  }
}
