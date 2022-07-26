import React from "react";
import { ReactQuestionFactory } from "survey-react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

/* style Overload */
import "../../../scss/sassForm/_questionText.scss";

export default function Text(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [value, setValue] = React.useState(new Date());
  const handleChangeDate = (newValue) => {
    setValue(newValue);
    props.question.setValueCore(newValue);
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
        <div className="text-question">
          <div className="text">
            {props.question.inputType === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  fullWidth
                  name={props.question?.name}
                  label={props.question?.title}
                  variant="outlined"
                  inputFormat="dd/MM/yyyy"
                  className="date"
                  value={value}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                fullWidth
                name={props.question?.name}
                label={props.question?.title}
                type={props.question?.inputType}
                multiline={
                  props.question?.inputType === "comment" ? true : false
                }
                variant="outlined"
                onChange={handleChangeValue}
                required={props.question.isRequired}
              />
            )}
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
ReactQuestionFactory.Instance.registerQuestion("text", (props) => {
  return React.createElement(Text, props);
});
