import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

import Login from "./Login";
import Register from "./Register";

const style = {
  margin: 15,
};

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    let loginButtons = [];
    loginButtons.push(
      <div key={"Login-Div"}>
        <MuiThemeProvider>
          <div id='register'>
            <RaisedButton
              label={"Zarejestruj"}
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
    this.state = {
      login: "",
      password: "",
      loginscreen: [],
      loginmessage: "",
      loginButtons: loginButtons,
      buttonLabel: "",
      isLogin: true,
    };
  }
  componentDidMount() {
    let loginscreen = [];
    loginscreen.push(
      <Login
        parentContext={this}
        appContext={this.props.appContext}
        key={"LoginScreen"}
      />
    );
    const loginmessage = "Nie masz jeszcze konta? Zarejestruj się!";
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage,
    });
  }
  handleClick(event) {
    let loginmessage;
    if (this.state.isLogin) {
      let loginscreen = [];
      let loginButtons = [];
      loginscreen.push(
        <Register parentContext={this} appContext={this.props.appContext} />
      );
      loginmessage = "Jeśli posiadasz już konto, wróć do strony logowania.";
      loginButtons.push(
        <div key="login-button">
          <MuiThemeProvider>
            <div>
              <RaisedButton
                label={"Wróć do strony logowania"}
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)}
              />
            </div>
          </MuiThemeProvider>
        </div>
      );
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
        loginButtons: loginButtons,
        isLogin: false,
      });
    } else {
      let loginscreen = [],
        loginButtons = [];
      loginButtons.push(
        <div id='register'>
          <MuiThemeProvider>
            <div id='register'>
              <RaisedButton
                label={"Zarejestruj"}
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)}
              />
            </div>
          </MuiThemeProvider>
        </div>
      );
      loginscreen.push(
        <Login parentContext={this} appContext={this.props.appContext} />
      );
      loginmessage = "Nie masz jeszcze konta? Zarejestruj się";
      this.setState({
        loginscreen: loginscreen,
        loginmessage: loginmessage,
        loginButtons: loginButtons,
        isLogin: true,
      });
    }
  }
  render() {
    return (
      <div className="loginscreen" key="loginscreen">
        {this.state.loginscreen}
        <div id='register'>
          {this.state.loginmessage}
          {this.state.loginButtons}
        </div>
      </div>
    );
  }
}

export default Loginscreen;
