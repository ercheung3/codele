import { render } from "react-dom";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionsComponent from "./routes/QuestionsComponent/questionsComponent";
import DailyQuestionComponent from "./routes/DailyQuestionComponent/dailyQuestionComponent";
import QuestionComponent from "./routes/QuestionComponent/questionComponent";
import HomeComponent from "./components/HomeComponent/homeComponent";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path=""
          element={
            <>
              <HomeComponent />
              <DailyQuestionComponent />
            </>
          }
        />
        {/*<Route path="daily" element={<DailyQuestionComponent />} />*/}
        <Route path="questions" element={<QuestionsComponent />}>
          <Route path=":questionId" element={<QuestionComponent />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
