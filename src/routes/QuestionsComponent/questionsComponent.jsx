import { useOutletContext } from "react-router-dom";

const QuestionsComponent = () => {
  const questions = useOutletContext();
  console.log(questions);
  return (
    <div>
      <h2>ALL QUESTIONS</h2>
      {questions.map((question) => {
        return <p key={`${question.source}-${question.id}`}>{question.name}</p>;
      })}
    </div>
  );
};

export default QuestionsComponent;
