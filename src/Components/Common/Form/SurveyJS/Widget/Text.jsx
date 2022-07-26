import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import * as Survey from "survey-react";
/* style Custom */
import "../../../scss/sassForm/_widgetText.scss";

export class TextModel extends Survey.Question {
  //select type in json form to work
  getType() {
    return "textwidget";
  }
}

export class Text extends Survey.SurveyElementBase {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: "top-start"
    };
  }
  //get datas in json of SurveyJs
  get question() {
    return this.props?.question;
  }

  //create and customize the component
  render() {
    const handleClick = () => (e) => {
      this.setState({ anchorEl: e.currentTarget });
      this.setState({ open: !this.state?.open });
      setTimeout(() => {
        this.setState({ open: !this.state.open });
      }, 3000);
    };
    const handleChangeValue = (e) => {
      this.question.setValueCore(e.target?.value);
    };

    if (!this.question) return null;
    return (
      <div className="text-widget">
        <div className="text">
          {this.question.icon?.left ? (
            <div className="icons">
              <i className={this.question.icon?.left} aria-hidden="true"></i>
            </div>
          ) : null}
          <TextField
            fullWidth
            name={this.question.name}
            title={this.question.title}
            label={this.question.title}
            multiline={this.question.multiline}
            variant={this.question.variant}
            onChange={handleChangeValue}
            required={this.question.isRequired}
          />
          {/*}
          <pre>{JSON.stringify(this.question, null, 2)}</pre>
          */}

          {this.question?.help ? (
            <div className="icons">
              <Button onClick={handleClick("top-start")}>
                <i className={this.question.help.icon} aria-hidden="true"></i>
              </Button>
              <Popper
                open={this.state?.open}
                anchorEl={this.state?.anchorEl}
                placement={this.state?.placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography className="popper" sx={{ p: 2 }}>
                        <span className="h5">
                          {this.question.help.title}
                          <dfn>{this.question.name}</dfn>
                        </span>
                        <span className="text">{this.question.help.text}</span>
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
              {this.question.icon?.right ? (
                <div className="icons">
                  <i
                    className={this.question.icon?.right}
                    aria-hidden="true"
                  ></i>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

/* Add attributs. Warning : attributes with arrays must be filled */
Survey.Serializer.addClass(
  "textwidget",
  [
    {
      name: "icon"
    },
    {
      name: "help"
    },
    {
      name: "multiline"
    }
  ],
  function () {
    return new TextModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion("textwidget", (props) => {
  return React.createElement(Text, props);
});
