import { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import "./newQuestionComponent.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sanitizeHtml from "sanitize-html";

const NewQuestionComponent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [newQuestion, setNewQuestion] = useState({});

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const handleInputChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuillChange = (e) => {
    console.log(e);
    newQuestion.text = sanitizeHtml(e);
    console.log(`Sanitized: ${newQuestion.text}`);
  };

  const submitNewQuestion = (e) => {
    e.preventDefault();
    props.createNewQuestion(newQuestion);
    console.log(newQuestion);
    setNewQuestion({
      //Change Question State
      name: "",
      text: "",
      source: "",
      link: "",
      difficulty: 0,
    });
    setIsActive(false);
  };

  return (
    <>
      {isActive ? (
        <div id="new-question-form-container">
          <CloseButton className="close-button" onClick={toggleIsActive} />
          <form className="new-question-form" onSubmit={submitNewQuestion}>
            <div className="form-inputs">
              <input
                onChange={handleInputChange}
                type="text"
                name="name"
                value={newQuestion.name}
                placeholder="Question Name"
              ></input>
              <ReactQuill
                theme="snow"
                value={newQuestion.text}
                onChange={handleQuillChange}
                placeholder="Question"
              />
              <input
                onChange={handleInputChange}
                type="text"
                name="source"
                value={newQuestion.source}
                placeholder="Question Source"
              ></input>
              <input
                onChange={handleInputChange}
                type="text"
                name="link"
                value={newQuestion.link}
                placeholder="Question Link"
              ></input>
              <label htmlFor="difficulty">Difficulty(0 to 5):</label>
              <input
                id="difficulty"
                onChange={handleInputChange}
                type="number"
                name="difficulty"
                min="0"
                max="5"
                value={newQuestion.difficulty}
              ></input>
            </div>
            <Button variant="primary" type="submit">
              Add New Question
            </Button>
          </form>
        </div>
      ) : (
        <Button variant="primary" onClick={toggleIsActive}>
          Add A New Code Challenge!
        </Button>
      )}
    </>
  );
};

export default NewQuestionComponent;
