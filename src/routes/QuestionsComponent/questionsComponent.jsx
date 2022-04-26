import { Link, Outlet, useOutletContext } from "react-router-dom";

const QuestionsComponent = () => {
  const questions = useOutletContext();
  console.log(questions);
  return (
    <div>
      <h2>ALL QUESTIONS</h2>
      {questions.map((question) => {
        return (
          <Link to={`${question.id}`} key={`${question.source}-${question.id}`}>
            {question.name}
          </Link>
        );
      })}
      <Outlet />
    </div>
  );
};

export default QuestionsComponent;
