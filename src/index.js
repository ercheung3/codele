import { render } from "react-dom";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionsComponent from "./routes/QuestionsComponent/questionsComponent";
import DailyQuestionComponent from "./routes/DailyQuestionComponent/dailyQuestionComponent";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/daily" element={<DailyQuestionComponent />} />
      <Route path="questions" element={<QuestionsComponent />} />
    </Routes>
    <App />
  </BrowserRouter>,
  rootElement
);
