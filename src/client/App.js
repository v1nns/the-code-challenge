import React, { Component } from "react";
import "./app.css";

import Editor from "./components/Editor";

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    // fetch("/api/getUsername")
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {
    return <Editor />;
  }
}
