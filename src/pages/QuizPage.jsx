import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Test } from "../components";

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[i],
    ];
  }

  return newArray;
}

function QuizPage() {
  const { title } = useParams();

  const {
    data,
    isPending,
    error,
  } = useFetch("/db.json");

  const [student, setStudent] = useState(() => {
    const savedStudent = sessionStorage.getItem("student");

    return savedStudent
      ? JSON.parse(savedStudent)
      : null;
  });

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    document.title = "Quiz " + title;
  }, [title]);

  const quizzes = data?.quizzes;

  const currentQuiz = quizzes?.find(
    (quiz) => quiz.title === title
  );

  // Savollarni faqat birinchi marta aralashtiramiz
  useEffect(() => {
    if (!currentQuiz?.questions) return;

    const storageKey = `quizQuestions-${title}`;

    const savedQuestions = sessionStorage.getItem(storageKey);

    if (savedQuestions) {
      setShuffledQuestions(JSON.parse(savedQuestions));
      return;
    }

    const newQuestions = shuffleArray(
      currentQuiz.questions
    );

    sessionStorage.setItem(
      storageKey,
      JSON.stringify(newQuestions)
    );

    setShuffledQuestions(newQuestions);
  }, [currentQuiz, title]);

  function handleStartQuiz(studentData) {
    sessionStorage.setItem(
      "student",
      JSON.stringify(studentData)
    );

    setStudent(studentData);
  }

  return (
    <section className="quiz-container container">

      {isPending && <h3>Loading...</h3>}

      {error && <h3>{error}</h3>}

      {currentQuiz && (
        <>
          {!student && (
            <div className="student-modal-overlay">
              <div className="student-modal">

                <div className="student-modal-heading">
                  <span className="student-modal-label">
                    {currentQuiz.title} QUIZ
                  </span>

                  <h2>
                    Quizga tayyormisiz?
                  </h2>

                  <p>
                    Testni boshlash uchun ism va
                    familiyangizni kiriting.
                  </p>
                </div>

                <StudentForm
                  onStart={handleStartQuiz}
                />

              </div>
            </div>
          )}

          {student && shuffledQuestions.length > 0 && (
            <>
              <div className="student-info">
                <div className="student-info-icon">
                  {student.firstName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="student-info-text">
                  <span>O‘quvchi</span>

                  <strong>
                    {student.firstName}{" "}
                    {student.lastName}
                  </strong>
                </div>
              </div>

              <Test
                questions={{
                  ...currentQuiz,
                  questions: shuffledQuestions,
                }}
                  student={student}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}

function StudentForm({ onStart }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      alert("Iltimos, ism va familiyangizni kiriting!");
      return;
    }

    onStart({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
  }

  return (
    <form
      className="student-modal-form"
      onSubmit={handleSubmit}
    >
      <div className="student-field">
        <label htmlFor="firstName">
          Ism
        </label>

        <input
          id="firstName"
          type="text"
          placeholder="Ismingizni kiriting"
          value={firstName}
          onChange={(e) =>
            setFirstName(e.target.value)
          }
        />
      </div>

      <div className="student-field">
        <label htmlFor="lastName">
          Familiya
        </label>

        <input
          id="lastName"
          type="text"
          placeholder="Familiyangizni kiriting"
          value={lastName}
          onChange={(e) =>
            setLastName(e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        className="student-submit"
      >
        <span>Quizni boshlash</span>
        <span>→</span>
      </button>
    </form>
  );
}

export default QuizPage;