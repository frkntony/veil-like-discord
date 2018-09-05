import React, { Component } from 'react'

class UserNameForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      videoSource: 'backgroundLogin.mp4'
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  onChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }




  render() {

    const brandLogo = {
      'fontFamily': 'Indie Flower'
    };

    return (

      <div>
        <header className="main-header">

          <nav className="transparent">

            <div className="container">


              <div className="nav-wrapper">

                <a href="/" className="brand-logo" style={brandLogo}>Veil</a>


                <ul className="right hide-on-med-and-down">
                  <li><a href="https://github.com/frkntony" className="btn red waves-effect waves-black">Source Code</a></li>
                  <li><a href="https://twitter.com/frkntony"> <i className="fab fa-twitter red-text"></i> </a></li>
                  <li><a href="https://github.com/frkntony"> <i className="fab fa-github red-text"></i> </a></li>
                </ul>


              </div>

            </div>

          </nav>


          <div className="showcase container">
            <div className="row">
              <div className="col s12 m10 offset-m1 center">
                <h1 className="white-text">Welcome to the chat</h1>
                <p className="red-text">Beta version under development</p>
                <br />
                <br />
                <form onSubmit={this.onSubmit}>
                  <input className="teal-text center-align" type="text" placeholder="Nickname" onChange={this.onChange} />
                  <button type='submit' className="btn-large red white-text waves-effect waves">ENTER</button>
                </form>
              </div>
            </div>

          </div>

        </header>


        <video id="bgvid" playsInline autoPlay muted loop>
          <source src={this.state.videoSource} type="video/mp4" />
        </video>


        <footer className="page-footer transparent">
          <div className="row">
            <div className="col s12">
              <p className="center-align red-text">&copy; 2018 Tony Elistratov | Built with ReactJS, ChatkitSDK and Materialize.css</p>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

export default UserNameForm