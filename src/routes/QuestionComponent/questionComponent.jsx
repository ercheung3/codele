import { useParams } from "react-router-dom";

const QuestionComponent = () => {
  let params = useParams();
  return (
    <div>
      <h2> Question: {params.questionId} </h2>
    </div>
  );
};

export default QuestionComponent;
