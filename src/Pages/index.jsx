import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SurveyJS from "../Components/Common/Form/SurveyJS";
import "../Components/Common/scss/sassForm/Index.scss";

const rootElement = document.getElementById("surveyElement");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SurveyJS />
  </StrictMode>
);
