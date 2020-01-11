import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import AceEditor from "react-ace";
import Console from "react-component-console";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-tomorrow_night";

/* CSS values */
const toolbar = { minHeight: 36, background: "#282a36" };

const editor = {
  height: "100%"
  // border: "1px solid red"
};

const terminal = {
  height: "98%",
  textAlign: "left",
  paddingLeft: 10
  // border: "1px solid red"
};

/* Class implementation */
export default class Editor extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <AppBar position="static">
          <Toolbar style={toolbar}>
            <Grid justify="space-between" container spacing={24}>
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Question 1
                </Typography>
              </Grid>

              <Grid item>
                <div>
                  <Button raised color="inherit">
                    Run
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container style={{ height: "calc(100% - 36px)" }}>
          <Grid item xs={7}>
            <div style={editor}>
              <AceEditor
                mode="c_cpp"
                theme="tomorrow_night"
                name="code-editor"
                fontSize={17}
                width="100%"
                height="100%"
                setOptions={{
                  highlightActiveLine: false,
                  highlightGutterLine: false,
                  spellcheck: true,
                  printMargin: false
                }}
              />
            </div>
          </Grid>

          <Grid item xs={5}>
            <div style={terminal}>
              <Console lines={[""]} console={{ append: true }} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
