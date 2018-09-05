import React, { Component } from 'react'

export default class WhoIsOnline extends Component {
  render() {

    if (this.props.users) {
      return (

        <ul>
          {this.props.users.map((user, index) => {
            
            let currentUser

            if (user.presence.state === 'online') {
              
              currentUser = <li className='white-text' key={index}>{user.name} </li>
              
            } else if (user.presence.state === 'offline') {
              
              currentUser = <li className='red-text' key={index}>{user.name} </li>
              
            }
            
            return currentUser


          })}
        </ul>




      )
    } else {
      return <p>Loading...</p>
    }
  }
}
