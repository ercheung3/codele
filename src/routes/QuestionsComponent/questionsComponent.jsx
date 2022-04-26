import { Link, Outlet, useOutletContext } from "react-router-dom";
import NewQuestionComponent from "./NewQuestionComponent/newQuestionComponent";
const QuestionsComponent = () => {
  const [questions, createNewQuestion] = useOutletContext();

  return (
    <div>
      <h2>ALL QUESTIONS</h2>
      <NewQuestionComponent
        createNewQuestion={createNewQuestion}
      ></NewQuestionComponent>
      {questions.map((question) => {
        return (
          <Link to={`${question.id}`} key={`${question.source}-${question.id}`}>
            {question.name}
          </Link>
        );
      })}
      <Outlet context={[questions]} />
    </div>
  );
};

export default QuestionsComponent;
