import React, { Component } from 'react'

export default class UserTotalCounter extends Component {
  render() {
    if (this.props.users) {
        return this.props.users.length
        
    } else {
        return 'loading'
    }
  }
}
