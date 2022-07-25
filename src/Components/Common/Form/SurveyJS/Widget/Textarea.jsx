import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import * as Survey from "survey-react";
/* style Custom */
import "../../../scss/sassForm/WidgetTextarea.scss";

export class TextModel extends Survey.Question {
  //select type in json form to work
  getType() {
    return "textareawidget";
  }
}

export class Textarea extends Survey.SurveyElementBase {
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
    return this.props.question;
  }

  //create and customize the component
  render() {
    const handleClick = (newPlacement) => (e) => {
      this.setState({ anchorEl: e.currentTarget });
      this.setState({ open: !this.state.open });
    };
    const handleChangeValue = (e) => {
      this.question.setValueCore(e.target.value);
    };

    if (!this.question) return null;
    return (
      <div className="Textarea-widget">
        <div className="textarea">
          {this.question.icon?.left ? (
            <div className="icons">
              <i className={this.question.icon?.left} aria-hidden="true"></i>
            </div>
          ) : null}
          <TextareaAutosize
            minRows={2}
            maxRows={8}
            name={this.question.name}
            placeholder={this.question.placeholder}
            variant={this.question.variant}
            onChange={handleChangeValue}
          />
          {/*
              <pre>{JSON.stringify(this.question, null, 2)}</pre>
            */}
          {this.question.help ? (
            <div className="icons">
              <Button onClick={handleClick("top-start")}>
                <i className={this.question.help.icon} aria-hidden="true"></i>
              </Button>
              <Popper
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                placement={this.state.placement}
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
            </div>
          ) : null}
          {this.question.icon?.right ? (
            <div className="icons">
              <i className={this.question.icon?.right} aria-hidden="true"></i>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

/* Add attributs. Warning : attributes with arrays must be filled */
Survey.Serializer.addClass(
  "textareawidget",
  [
    {
      name: "icon"
    },
    {
      name: "help"
    },
    {
      name: "placeholder"
    }
  ],
  function () {
    return new TextModel("");
  },
  "question"
);

Survey.ReactQuestionFactory.Instance.registerQuestion(
  "textareawidget",
  (props) => {
    return React.createElement(Textarea, props);
  }
);
