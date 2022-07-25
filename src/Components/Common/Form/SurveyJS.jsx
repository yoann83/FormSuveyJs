import React, { useCallback } from "react";
import "survey-core/modern.min.css";
import * as Survey from "survey-react";
//Json for form Survey
import { surveyJson } from "../../../Pages/SurveyJson";
import "./SurveyJS/Index";

Survey.StylesManager.applyTheme("modern");

export default function SurveyJS() {
  const surveyModel = new Survey.Model(surveyJson);
  surveyModel.focusFirstQuestionAutomatic = true;

  const formCompleted = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  surveyModel.onComplete.add(formCompleted);

  return (
    <div id="form_survey">
      <Survey.Survey model={surveyModel} />
    </div>
  );
}
