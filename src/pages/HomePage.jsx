import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className="home">
      <section className="hero">
        <h1>
        {isAuthenticated
          ? `Welcome back${user?.name ? `, ${capitalize(user.name)}` : ""}`
          : "Track Your Job Applications Smarter"}
        </h1>

        <p>
          {isAuthenticated
            ? "Continue managing your applications, tracking statuses, and staying organized."
            : "Job Pilot helps you manage your job search, track applications, and stay organized every step of the way."}
        </p>

        <div className="hero-actions">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/jobtracker")}
              className="primary-btn"
            >
              Go to Job Tracker
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="primary-btn"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="secondary-btn"
              >
                Login
              </button>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Track Applications</h3>
          <p>Keep all your job applications in one place.</p>
        </div>

        <div className="feature-card">
          <h3>Monitor Status</h3>
          <p>See where you stand with every opportunity.</p>
        </div>

        <div className="feature-card">
          <h3>Stay Organized</h3>
          <p>Never lose track of your job search progress.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;