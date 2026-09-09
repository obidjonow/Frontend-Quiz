import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { Test } from "../components";

function QuizPage() {
  const { title } = useParams();

  const {
    data,
    isPending,
    error,
  } = useFetch("/db.json");

  useEffect(() => {
    document.title = "Quiz " + title;
  }, [title]);

  const quizzes = data?.quizzes;

  const currentQuiz = quizzes?.find(
    (quiz) => quiz.title === title
  );

  return (
    <section className="quiz-container container">
      {isPending && <h3>Loading...</h3>}

      {error && <h3>{error}</h3>}

      {currentQuiz && <Test questions={currentQuiz} />}
    </section>
  );
}

export default QuizPage;

