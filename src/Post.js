import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Axios from "axios";
import ReactDOM from 'react-dom';

import "./App.css";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token: props.appContext,
          eventType: "",
          eventDate: "2020-06-13T12:00:30",
          eventCountry: "",
        };
    }
    handleClick(event) {
        
        const apiBaseUrl = "http://localhost:8080";
        const self = this;
        console.log(this.state.eventType)
        console.log(this.state.eventDate)
        console.log(this.state.eventCountry)
        if (
          this.state.eventType.length > 0 &&
          this.state.eventDate.length > 0 &&
          this.state.eventCountry.length > 0
        ) {
        const payload = {
            type: this.state.eventType,
            date: this.state.eventDate,
            country: this.state.eventCountry,
        };
        Axios
            .post(apiBaseUrl + "/events", payload, {headers: {
                'Authorization': this.state.token,
                'Content-Type': 'application/json'
            }})
            .then(function (response) {
            console.log("RESPONSE:::", response);

            if (response.status === 201) {
                alert("Zaktualizowano");
            } else {
                console.log("Wystąpił problem: ", response.status);
            }
            })
            .catch(function (error) {
                alert("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB.")
                console.log("ERROR::::", error);
            });
        }
    }
    componentDidMount() {
        ReactDOM.render("", document.getElementById('register'));
    }
    render() {
        let userhintText, userLabel;
        userhintText = "Podaj nazwę użytkownika";
        userLabel = "Coś";
        return (
            <div id='post'>
            <MuiThemeProvider>
                <div>
                <AppBar title="Post" />
                <TextField
                    hintText="Case Type - DEAD/SICK/RECOVERED"
                    floatingLabelText="Case Type - DEAD/SICK/RECOVERED"
                    value={this.state.eventType}
                    onChange={(event, newValue) => this.setState({ eventType: newValue })}
                />
                <br />
                <TextField
                    hintText="Data"
                    floatingLabelText="Data"
                    value={this.state.eventDate}
                    onChange={(event, newValue) => this.setState({ eventDate: newValue })}
                />
                <br />
                <TextField
                    hintText="Kraj"
                    floatingLabelText="Kraj"
                    onChange={(event, newValue) => this.setState({ eventCountry: newValue })}
                />
                <br />
                <RaisedButton
                    label="Dodaj event"
                    primary={true}
                    style={style}
                    onClick={(event) => this.handleClick(event)}
                />
                </div>
            </MuiThemeProvider>
            </div>
    );
    }
}

const style = {
    margin: 15,
};
  

export default Post;