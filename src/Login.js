import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Axios from "axios";
import statsScreen from "./StatsScreen";
import { func } from "prop-types";
import StatsScreen from "./StatsScreen";
import Post from "./Post";

const apiBaseUrl = "http://localhost:8080";

class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="Nazwa użytownika"
            floatingLabelText="nazwa użytktownika"
            onChange={(event, newValue) => this.setState({ login: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Hasło"
            floatingLabelText="Hasło"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Zaloguj"
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event)}
          />
        </div>
      </MuiThemeProvider>
    );
    this.state = {
      login: "",
      password: "",
      token: "",
      loginComponent: localloginComponent,
    };
  }
  componentDidMount() {
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="Nazwa użytownika"
            floatingLabelText="nazwa użytktownika"
            onChange={(event, newValue) => this.setState({ login: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Hasło"
            floatingLabelText="Hasło"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton
            label="Zaloguj"
            primary={true}
            style={style}
            onClick={(event) => this.handleClick(event)}
          />
        </div>
      </MuiThemeProvider>
    );
    this.setState({ loginComponent: localloginComponent });
  }
  handleClick(event) {
    const payload = {
      login: this.state.login,
      password: this.state.password
    };
    let currentComponent = this;
    let statsScreen = [];
    let postScreen = [];

    Axios.post(apiBaseUrl + "/login", payload, {
    })
      .then(function (response) {
        currentComponent.setState({token: response.headers.authorization});
        if (response.status === 200) {
          fetch('http://localhost:8080/events', {
            headers: new Headers({
              'Authorization': currentComponent.state.token,
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          }).then( function (response2){
            if (response2.status === 200) {
              statsScreen.push(<StatsScreen
              parentContext={this}
              appContext={response.headers.authorization}
              />);
              currentComponent.setState({ loginComponent: statsScreen })
            } else {
                postScreen.push(<Post 
                  parentContext={this}
                  appContext={response.headers.authorization}
                />);
                currentComponent.setState({ loginComponent: postScreen})
              console.log(currentComponent.state.token)
            }
          });
          
	      } else {
          console.log("Podany użytkownik nie istnieje");
          alert("Podany użytkownik nie istnieje");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div id='login'>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
