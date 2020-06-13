import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ReactDOM from 'react-dom';
import "./App.css";

const JsonTable = require('ts-react-json-table');

class StatsScreen extends Component {
    constructor(props) {
        super(props);
        var statsComponent = [];
        statsComponent.push(
            <MuiThemeProvider key={"theme"}>
              <div id='container'>
              </div>
            </MuiThemeProvider>
        );
        this.state = {
            token: props.appContext,
            statsComponent: statsComponent
        };
    }
    componentDidMount() {
        var statsComponent = [];
        var items = [
          {"id": 75950,"name": "Louella Wallace","age": 24,"phone": "+44 (0)203 437 7302","color": {"green": 1, "blue": 2}},
        ];

        fetch('http://localhost:8080/events', {
              headers: new Headers({
                'Authorization': this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
              })
            })
            .then(response => response.json())
            .then((jsonData) => {
                console.log(jsonData['_embedded']['coronaEvents'])
                this.setState({coronaEvents: jsonData['_embedded']['coronaEvents']})
                for (var i in this.state.coronaEvents) {
                  delete this.state.coronaEvents[i]['_links'];
                }
                console.log(this.state.coronaEvents)
                statsComponent.push(
                    <MuiThemeProvider key={"theme"}>
                      <div id='container'>
                          
                      </div>
                    </MuiThemeProvider>
                );
                ReactDOM.render(<JsonTable rows = {this.state.coronaEvents} />, document.getElementById('container'));
                ReactDOM.render("", document.getElementById('register'));
              })
            .catch((error) => {
                console.error(error)
            })
        this.setState({ statsComponent: statsComponent });
      }

    render() {
        return (
          <div id='container'>
            {this.state.loginComponent}
          </div>
        );
    }
}

const style = {
    margin: 15
  };
  

export default StatsScreen;