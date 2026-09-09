// RRD imports
import { Link } from "react-router-dom";

// custom hooks
import { useFetch } from "../hooks/useFetch";

function MenuLinks() {
  const {
    data,
    isPending,
    error
  } = useFetch("/db.json");

  const quizzes = data?.quizzes;

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="menu-list">
        {quizzes &&
          quizzes.map((item) => {
            return (
              <Link
                to={`/quiz/${item.title}`}
                key={item.title}
                className="menu-item header-logo"
              >
                <figure style={{ backgroundColor: item.color }}>
                  <img src={item.icon} alt={item.title} />
                </figure>

                <span>{item.title}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default MenuLinks;

