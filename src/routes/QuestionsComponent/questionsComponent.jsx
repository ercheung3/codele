import { Link, Outlet, useOutletContext } from "react-router-dom";
import NewQuestionComponent from "./NewQuestionComponent/newQuestionComponent";
import "./questionsComponent.css";

const QuestionsComponent = () => {
  const [questions, createNewQuestion] = useOutletContext();

  return (
    <div>
      <h2>ALL QUESTIONS</h2>
      <NewQuestionComponent
        createNewQuestion={createNewQuestion}
      ></NewQuestionComponent>
      <Outlet context={[questions]} />
      <ol className="questions-list">
        {questions.map((question) => {
          return (
            <li key={`${question.source}-${question.id}`}>
              <Link to={`${question.id}`} className="question-link">
                {question.name}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuestionsComponent;
