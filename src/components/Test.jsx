import { useState } from "react";
import Result from "./result";

// toast
import toast from "react-hot-toast";

function Test({ questions: { questions, title, color, icon }, student }) {
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer === null) {
      toast.error("Please, select an answer");
      return;
    }

    if (selectedAnswer === correctAnswer) {
      setAnswerStatus("correct");
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      setAnswerStatus("incorrect");
    }

    setShowNextButton(true);
    setStatusDisabled(true);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
    setAnsweredQuestions((prev) => prev + 1);

    setSelectedAnswer(null);
    setShowNextButton(false);
    setAnswerStatus(null);
    setStatusDisabled(false);
  };

  

  if (questionIndex === questions.length) {
    return (
      <Result
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={correctAnswerCount}
        questions={questions}
        student={student}
      />
    );
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <p className="test-description">
          Questions {answeredQuestions} of {questions.length}
        </p>

        <h2 className="test-title">
          {questions[questionIndex].question}
        </h2>

        <div className="test-proccess-container">
          <div
            className="test-proccess"
            style={{
              width:
                (answeredQuestions / questions.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>

      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {questions[questionIndex].options.map((option, index) => {
              const alphabet = String.fromCharCode(65 + index);

              let className = "";

              if (
                answerStatus === "correct" &&
                option === selectedAnswer
              ) {
                className = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  className = "incorrect";
                }

                if (option === questions[questionIndex].answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>

                    <input
                      type="radio"
                      name="option"
                      onChange={() => setSelectedAnswer(option)}
                      disabled={statusDisabled}
                    />

                    <span className="test-text">{option}</span>

                    <img
                      className="test-icon-correct"
                      src="../assets/icon-correct.svg"
                      alt="correct"
                      width={40}
                      height={40}
                    />

                    <img
                      className="test-icon-incorrect"
                      src="../assets/icon-incorrect.svg"
                      alt="incorrect"
                      width={40}
                      height={40}
                    />
                  </label>
                </li>
              );
            })}
          </ul>

          {!showNextButton && (
            <button className="btn test-btn">
              Submit Question
            </button>
          )}

          {showNextButton && (
            <button
              type="button"
              className="btn test-btn"
              onClick={handleNextQuestion}
            >
              {questions.length === questionIndex + 1
                ? "Finish"
                : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;