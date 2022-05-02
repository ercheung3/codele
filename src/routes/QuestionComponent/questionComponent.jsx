import "./questionComponent.css";
import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import sanitizeHtml from "sanitize-html";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

const QuestionComponent = () => {
  let params = useParams();
  const questions = useOutletContext()[0];
  const updateQuestion = useOutletContext()[1];
  const deleteQuestion = useOutletContext()[2];

  const [updatedQuestion, setUpdatedQuestion] = useState();
  //const [singleQuestion, setSingleQuestion] = useState();

  const [difficulty, setDifficulty] = useState("Unrated");
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const toggleIsEditModalActive = () => {
    //console.log(isEditModalActive);
    setIsEditModalActive(!isEditModalActive);
  };

  const showQuestion = () => {
    const question = questions.filter(
      (question) => parseInt(question.id) === parseInt(params.questionId)
    );
    //setSingleQuestion(question[0]);
    //console.log("Show Question");
    setUpdatedQuestion(question[0]);
    //changeDifficulty(question[0].difficulty);
  };

  const changeDifficulty = (difficulty) => {
    try {
      switch (difficulty) {
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
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * @name handleInputChange
   * @description Changes value of song based on input data
   *
   * @param {Event} e
   * @returns none
   */
  const handleInputChange = (e) => {
    setUpdatedQuestion({
      //property spread notation
      ...updatedQuestion,
      //e is event; we use target to allow for all input fields.
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.name);
    //console.log(e.target.value);
    //console.log(updatedQuestion);
  };

  const handleQuillChange = (e) => {
    //console.log(e);
    setUpdatedQuestion({
      //property spread notation
      ...updatedQuestion,
      //e is event; we use target to allow for all input fields.
      text: sanitizeHtml(e),
    });
    //console.log(`Sanitized: ${updatedQuestion.text}`);
  };

  /**
   * @name submitUpdateItem
   * @description Validation function to check submission.
   * @param {Event} e
   * @returns null
   */
  const submitUpdateItem = (e) => {
    e.preventDefault();
    /*This is an additional validation*/
    //There are easier ways to validate inputs
    //required, minLength, etc...
    let validSubmission = true;

    if (validSubmission) {
      updateQuestion(params.questionId, updatedQuestion);
      setUpdatedQuestion({
        //Change Question State
        name: updatedQuestion.name,
        text: updatedQuestion.text,
        source: updatedQuestion.source,
        link: updatedQuestion.link,
        difficulty: updatedQuestion.difficulty,
      });
      //changeDifficulty(updatedQuestion.difficulty);
      setIsEditModalActive(false);
    }
  };

  useEffect(showQuestion, [params]);

  return (
    <div className="question-container">
      {!!updatedQuestion ? (
        <>
          {isEditModalActive ? (
            <div id="edit-question-form-container">
              <CloseButton
                className="close-button"
                onClick={toggleIsEditModalActive}
              />
              <form className="edit-question-form" onSubmit={submitUpdateItem}>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={updatedQuestion.name}
                  placeholder="Question Name"
                ></input>
                <ReactQuill
                  onChange={handleQuillChange}
                  theme="snow"
                  defaultValue={updatedQuestion.text}
                  placeholder="Question"
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="source"
                  value={updatedQuestion.source}
                  placeholder="Question Source"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="link"
                  value={updatedQuestion.link}
                  placeholder="Question Link"
                ></input>
                <div>
                  <label htmlFor="difficulty">Difficulty(0 to 5):</label>
                  <input
                    id="difficulty"
                    onChange={handleInputChange}
                    type="number"
                    name="difficulty"
                    min="0"
                    max="5"
                    value={updatedQuestion.difficulty}
                  ></input>
                </div>
                <br></br>
                <Button
                  variation="primary"
                  className="update-question-submit-button"
                  type="submit"
                >
                  UPDATE QUESTION
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
          {/*
          <Modal show={isEditModalActive} onHide={toggleIsEditModalActive}>
            <Modal.Header closeButton>
              <Modal.Title>{updatedQuestion.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="edit-question-form" onSubmit={submitUpdateItem}>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={updatedQuestion.name}
                  placeholder="Question Name"
                ></input>
                <ReactQuill
                  onChange={handleQuillChange}
                  theme="snow"
                  value={updatedQuestion.text}
                  placeholder="Question"
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="source"
                  value={updatedQuestion.source}
                  placeholder="Question Source"
                ></input>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="link"
                  value={updatedQuestion.link}
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
                  value={updatedQuestion.difficulty}
                ></input>
                <br></br>
                <Button
                  variation="primary"
                  className="update-question-submit-button"
                  type="submit"
                >
                  UPDATE QUESTION
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
      */}
          <h2>{updatedQuestion.name}</h2>
          <div className="question-details">
            <p>
              Difficulty: <span>{updatedQuestion.difficulty}</span>
            </p>
            <a href={updatedQuestion.link} target="_blank" rel="noreferrer">
              {`Solve at ${updatedQuestion.source}`}
            </a>
            <Button
              variation="primary"
              onClick={() => {
                toggleIsEditModalActive();
              }}
            >
              <p>EDIT</p>
            </Button>
            <Button
              variation="danger"
              onClick={() => {
                deleteQuestion(params.questionId);
              }}
            >
              <p>DELETE</p>
            </Button>
          </div>
          <ReactQuill
            readOnly="true"
            theme="bubble"
            value={updatedQuestion.text}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default QuestionComponent;
