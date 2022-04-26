import "./dailyQuestionComponent.css";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DailyQuestionComponent = (props) => {
  const questions = useOutletContext();
  const [dailyQuestion, setDailyQuestion] = useState();
  const selectDailyQuestion = () => {
    //ADD LOGIC TO SELECT NEW QUESTION BASED ON TIME:DAY
    //Math.random()
    //HOW TO KNOW THE QUESTION IS THE DAILY QUESTION?
    //IS IT FROM QUESTIONS MODEL
    //OR FROM STATE
    //IF STATE THEN WHAT HAPPENS ON REFRESH?
    //IF MODEL THEN SHOULD I MAKE A BOOLEAN CALLED DAILY
    //THAT CHANGES FROM USE EFFECT?
    //MAYBE INT DAILY
    //PRESET 30 days? and within useEffect, set it
    console.log("This will run every 10 second!");
    let questionIndex = parseInt(Math.random() * questions.length);
    console.log("Question Index: " + questionIndex);
    console.log(!!dailyQuestion);
    setDailyQuestion(questions[questionIndex]);
  };
  useEffect(selectDailyQuestion, []);

  return (
    <div>
      <h2>DAILY QUESTION</h2>
      {!!dailyQuestion ? (
        <>
          <div className="daily-question" style={{ whiteSpace: "pre-wrap" }}>
            {dailyQuestion.text}
          </div>

          <pre>
            <div className="daily-question">
              {
                "Given an array of integers your solution should find the smallest integer. \n\nFor example:\n\n- Given `[34, 15, 88, 2]` your solution will return `2`\n- Given `[34, -345, -1, 100]` your solution will return `-345`\n\nYou can assume, for the purpose of this kata, that the supplied array will not be empty.\n"
              }
            </div>
          </pre>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {`
      keep formatting

      keep spaces


      keep spaces
   `}
          </div>
          <ReactQuill theme="snow" value={dailyQuestion.text} />
        </>
      ) : (
        <Button onClick={selectDailyQuestion}>Show Question</Button>
      )}
    </div>
  );
};

export default DailyQuestionComponent;
