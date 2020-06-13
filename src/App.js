import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./Loginscreen";
import StateScreen from "./StatsScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
    };
  }
  componentDidMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} key={"login-screen"} />);
    this.setState({
      loginPage: loginPage,
    });
  }
  render() {
    return <div className="App">{this.state.loginPage}</div>;
  }
}

export default App;
