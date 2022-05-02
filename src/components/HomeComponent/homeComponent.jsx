import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const HomeComponent = (props) => {
  return (
    <Modal show={props.isModalActive} onHide={props.toggleIsModalActive}>
      <Modal.Header closeButton>
        <Modal.Title>Codele</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p>Codele is a spin off of the popular game, Wordle.</p>
        <p>
          It is meant to give coders a chance to practice code challenges from a
          variety of coding websites.
        </p>
        <p>
          You may used the provided Rich Text Editor to code or simply click the
          link to visit the website associated with the question.
        </p>
        <p>
          Regardless, visit the website and submit your code to check for
          correctness. There is no right way to complete the challenge!
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default HomeComponent;
