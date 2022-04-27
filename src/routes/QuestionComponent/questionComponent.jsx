import "./questionComponent.css";
import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const QuestionComponent = () => {
  let params = useParams();
  const [questions, createNewQuestion] = useOutletContext();
  const [singleQuestion, setSingleQuestion] = useState();

  const showQuestion = () => {
    const question = questions.filter(
      (question) => question.id == params.questionId
    );
    setSingleQuestion(question[0]);
  };
  useEffect(showQuestion);

  return (
    <div>
      {!!singleQuestion ? (
        <>
          <h2>{singleQuestion.name}</h2>
          <ReactQuill
            readOnly="true"
            theme="bubble"
            value={singleQuestion.text}
          />
          <a href={singleQuestion.link} target="_blank">
            {`Solve at ${singleQuestion.source}`}
          </a>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default QuestionComponent;
