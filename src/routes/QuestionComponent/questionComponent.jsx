import "./questionComponent.css";
import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const QuestionComponent = () => {
  let params = useParams();
  const [questions, createNewQuestion] = useOutletContext();
  const [singleQuestion, setSingleQuestion] = useState();
  const [difficulty, setDifficulty] = useState();
  const showQuestion = () => {
    const question = questions.filter(
      (question) => question.id == params.questionId
    );
    setSingleQuestion(question[0]);
    switch (singleQuestion.difficulty) {
      case 1:
        setDifficulty("Very Easy");
        break;
      case 2:
        setDifficulty("Easy");
        break;
      case 3:
        setDifficulty("Medium");
        break;
      case 4:
        setDifficulty("Hard");
        break;
      case 5:
        setDifficulty("Very Hard");
        break;
      default:
        setDifficulty("Beginner/Unrated");
    }
  };
  useEffect(showQuestion);

  return (
    <div>
      {!!singleQuestion ? (
        <>
          <h2>{singleQuestion.name}</h2>
          <div className="question-details">
            <p>
              Difficulty: <span>{difficulty}</span>
            </p>
            <a href={singleQuestion.link} target="_blank">
              {`Solve at ${singleQuestion.source}`}
            </a>
          </div>
          <ReactQuill
            readOnly="true"
            theme="bubble"
            value={singleQuestion.text}
          />
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default QuestionComponent;
