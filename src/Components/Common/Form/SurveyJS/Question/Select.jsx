import React, { useState } from "react";
import { ReactQuestionFactory } from "survey-react";
import SelectField from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
/* style Overload */
import "../../../scss/sassForm/QuestionSelect.scss";

export default function Select(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [choice, setchoice] = useState("");
  const onSelectChange = (e) => {
    setchoice(e.target.value);
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
        <div className="select-question">
          <div className="select">
            <FormControl required={props.question.isRequired} fullWidth>
              <InputLabel>{props.question.title}</InputLabel>
              <SelectField
                fullWidth
                id={props.question.inputId}
                value={choice}
                onChange={onSelectChange}
              >
                {props.question.choices.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.value}
                  </MenuItem>
                ))}
              </SelectField>
            </FormControl>
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
                          Text selectField help here...
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
ReactQuestionFactory.Instance.registerQuestion("dropdown", (props) => {
  return React.createElement(Select, props);
});
