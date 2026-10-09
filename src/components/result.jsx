import { Link } from "react-router-dom";

function Result({
  title,
  color,
  icon,
  correctAnswerCount,
  questions,
  student,
}) {
  const totalQuestions = questions.length;

  const percentage = Math.round(
    (correctAnswerCount / totalQuestions) * 100
  );

  let message = "";

  if (percentage >= 90) {
    message = "Ajoyib natija! 🎉";
  } else if (percentage >= 70) {
    message = "Juda yaxshi natija! 👏";
  } else if (percentage >= 50) {
    message = "Yaxshi harakat! 💪";
  } else {
    message = "Yana bir bor urinib ko‘ring! 🚀";
  }

  return (
    <div className="result-page">

      {/* CHAP TOMON */}
      <div className="result-left">

        <span className="result-completed">
          QUIZ COMPLETED
        </span>

        <h1 className="result-title">
          <span>Quizni</span>
          <span>tugatdingiz!</span>
        </h1>

        <p className="result-description">
          Ajoyib! Siz <strong>{title}</strong> quizini
          muvaffaqiyatli yakunladingiz.
        </p>

        <div className="result-student">

          <div className="result-avatar">
            {student?.firstName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <span>Quizni bajargan</span>

            <h2>
              {student?.firstName} {student?.lastName}
            </h2>
          </div>

        </div>

        <p className="result-message">
          {message}
        </p>

      </div>


      {/* O‘NG TOMON */}
      <div className="result-right">

        <div className="result-subject">

          <div
            className="result-subject-icon"
            style={{ backgroundColor: color }}
          >
            <img src={`.${icon}`} alt={title} />
          </div>

          <span>{title}</span>

        </div>


        <div className="result-score">

          <span className="result-score-label">
            YOUR SCORE
          </span>

          <div className="result-score-number">
            <strong>{correctAnswerCount}</strong>
            <span>/{totalQuestions}</span>
          </div>

          <div className="result-percentage">
            {percentage}%
          </div>

        </div>


        <div className="result-info">

          <div>
            <strong>{correctAnswerCount}</strong>
            <span>To‘g‘ri javob</span>
          </div>

          <div>
            <strong>{totalQuestions - correctAnswerCount}</strong>
            <span>Noto‘g‘ri javob</span>
          </div>

          <div>
            <strong>{totalQuestions}</strong>
            <span>Jami savol</span>
          </div>

        </div>


        <div className="result-actions">

          <Link
            to="/"
            className="result-home-btn"
          >
            Bosh sahifaga
          </Link>

          <button
            className="result-again-btn"
            onClick={() => window.location.reload()}
          >
            Qayta ishlash
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;