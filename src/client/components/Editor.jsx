import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import AceEditor from "react-ace";
import Console from 'react-component-console';

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

const editor = {
  height: "100vh"
};

const terminal = {
  height: "100vh"
};

export default class Editor extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={7}>
          <div style={editor}>
            <AceEditor
              mode="c_cpp"
              theme="dracula"
              name="code-editor"
              fontSize={17}
              height="100%"
              width="100%"
              setOptions={{
                highlightActiveLine: false,
                highlightGutterLine: false,
                showPrintMargin: false
              }}
            />
          </div>
        </Grid>
        <Grid item xs={5}>
          <div style={terminal}>
            <Console lines={["Hi!", "How are you today?"]} />
          </div>
        </Grid>
      </Grid>
    );
  }
}
