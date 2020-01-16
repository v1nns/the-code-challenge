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
  constructor(props) {
    super(props);
    this.state = { code: "", output: [""] };

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
  }

  handleEditorChange(newValue) {
    this.setState({ code: newValue });
  }

  handleClick() {
    if (this.state.code !== "") {
      /* Clean the terminal output */
      this.setState({ output: [""] });

      /* API Request */
      try {
        fetch("/api/v1/compiler/cpp", { method: "POST", body: this.state.code })
          .then(response => {
            if (response.status === 503) {
              throw new Error("Service unavailable");
            } else {
              return response.json();
            }
          })
          .then(result => {
            if ("error" in result) {
              /* Check if found error while trying to compile */
              this.setState({
                output: ["Compile error:", result.error.description]
              });
            } else if ("data" in result) {
              const data = result.data;
              if (data.stderr !== "") {
                /* Check if there is any error in stderr */
                this.setState({ output: ["Output error:", data.stderr] });
              } else {
                this.setState({ output: ["Output:", data.stdout] });
              }
            } else {
              throw new Error("Service unavailable");
            }
          });
      } catch (error) {
        this.setState({
          output: ["Error:", error]
        });
      }
    }
  }

  render() {
    const output = this.state.output;
    return (
      <div style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}>
        <AppBar position="static">
          <Toolbar style={toolbar}>
            <Grid justify="space-between" container spacing={10}>
              <Grid item>
                <Typography variant="h6" color="inherit">
                  code challenge
                </Typography>
              </Grid>

              <Grid item>
                <div>
                  <Button color="inherit" onClick={this.handleClick}>
                    Run
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid
          container
          style={{
            height: "calc(100% - 36px)"
          }}
        >
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
                  printMargin: false
                }}
                onChange={newValue => {
                  this.handleEditorChange(newValue);
                }}
                value={this.state.code}
              />
            </div>
          </Grid>

          <Grid item xs={5}>
            <div style={terminal}>
              <Console
                lines={output}
                console={{
                  append: true,
                  typing: {
                    char: {
                      avgMs: 10, // average time to write a character
                      deviation: 0.1, // deviate typing delay
                      minMs: 5 // take at least to write a character
                    },
                    line: {
                      avgMs: 100, // average delay between lines
                      deviation: 0.1, // deviate line delay
                      minMs: 50 // delay at least to between lines
                    }
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
