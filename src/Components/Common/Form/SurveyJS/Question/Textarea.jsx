import React from "react";
import { ReactQuestionFactory } from "survey-react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

/* style Overload */
import "../../../scss/sassForm/_questionTextarea.scss";

export default function Textarea(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleChangeValue = (e) => {
    props.question.setValueCore(e.target.value);
  };

  return (
    <div>
      {props.isDisplayMode ? (
        /* replace original component with theme surveyJs */
        <div
          id={props.question.inputId}
          className={props.question.getControlClass()}
          disabled
        >
          {props.question.displayValue || props.question.optionsCaption}
        </div>
      ) : (
        /* construct (overloard) all components (ex : material ui) */
        <div className="textarea-question">
          <div className="textarea">
            <TextareaAutosize
              minRows={2}
              maxRows={8}
              name={props.question.name}
              placeholder={props.question.title}
              variant={props.question.variant}
              onChange={handleChangeValue}
            />
            <div className="icons">
              <i
                onClick={handleClick("top-start")}
                className="fa fa-question-circle"
                aria-hidden="true"
              ></i>

              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography className="popper" sx={{ p: 2 }}>
                        <span className="h5">
                          The content of the <dfn>{props.question.name}</dfn>
                        </span>
                        <span className="text">
                          Text textField help here...
                        </span>
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/* only overload original type ("text", "dropdown" ...) and uncomment scss */
ReactQuestionFactory.Instance.registerQuestion("comment", (props) => {
  return React.createElement(Textarea, props);
});
