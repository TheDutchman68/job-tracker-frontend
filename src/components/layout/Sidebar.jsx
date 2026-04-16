import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, Briefcase, LogIn, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
      logout();
      navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>JobPilot</h2>}
       <button onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
       </button>
      </div>

      <nav>
        <Link className={isActive("/") ? "active" : ""} to="/" title={isCollapsed ? "Home" : ""}>
          <Home size={20} />
          <span className={`link-text ${isCollapsed ? "hidden" : ""}`}>Home</span>
        </Link>

        <Link className={isActive("/jobtracker") ? "active" : ""} to="/jobtracker" title={isCollapsed ? "Job Tracker" : ""}>
          <Briefcase size={20} />
          <span className={`link-text ${isCollapsed ? "hidden" : ""}`}>Job Tracker</span>
        </Link>

      {isAuthenticated ? (
          <button
            type="button"
            className="sidebar-link"
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={20} />
            <span className={`link-text ${isCollapsed ? "hidden" : ""}`}>Logout</span>
          </button>
            ) : (
              <Link
                className={isActive("/login") ? "active" : ""}
                to="/login"
                title={isCollapsed ? "Login" : ""}
              >
                <LogIn size={20} />
                <span className={`link-text ${isCollapsed ? "hidden" : ""}`}>Login</span>
              </Link>
            )}
      </nav>
    </aside>
  );
}

export default Sidebar;