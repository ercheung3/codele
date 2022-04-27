import "./dailyQuestionComponent.css";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const DailyQuestionComponent = (props) => {
  const [questions, createNewQuestion] = useOutletContext();
  const [dailyQuestion, setDailyQuestion] = useState();

  const [currDate, setCurrDate] = useState(new Date());
  //Base Date is May 2nd, 2022
  const baseDate = new Date(2022, 4, 2);

  const selectDailyQuestion = () => {
    const hash =
      (currDate.getMonth() - baseDate.getMonth()) * 30 +
      Math.abs(currDate.getDay() - baseDate.getDay());

    //Before the release of the app
    let questionIndex;
    if (hash <= 0) questionIndex = 0;
    else questionIndex = hash % questions.length;
    setDailyQuestion(questions[questionIndex]);
  };

  const changeDate = () => {
    let newDate = new Date(currDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrDate(newDate);
    //console.log(currDate);
    selectDailyQuestion();
  };

  useEffect(selectDailyQuestion, []);

  return (
    <div>
      {!!dailyQuestion ? (
        <>
          <ReactQuill
            readOnly="true"
            theme="bubble"
            value={dailyQuestion.text}
          />
          <Button onClick={changeDate}>Change Question</Button>
        </>
      ) : (
        <Button onClick={selectDailyQuestion}>Show Question</Button>
      )}
    </div>
  );
};

export default DailyQuestionComponent;
