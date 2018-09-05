import React, { Component } from 'react'

class SendMessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.refs.usrMsg.value = ''
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
    this.props.onChange()
  }

  render() {
    return (

      <div className="card-panel black white-text" style={{'height': '15vh'}}>
      <div className="row">
      <form onSubmit={this.onSubmit}>
        <div className="input-field small col s7 l10 m10">
          <i className="material-icons prefix">account_circle</i>
          <input id="name" type="text" ref="usrMsg" className="validate" placeholder='New message...' onChange={this.onChange} />
        </div>
        <div className="input-field col s5 l2 m2">
          <button className="btn red waves-effect waves-light" type="submit" name="action">SEND
          </button>
        </div>
        </form>
      </div>
    </div>
    )
  }
}

export default SendMessageForm