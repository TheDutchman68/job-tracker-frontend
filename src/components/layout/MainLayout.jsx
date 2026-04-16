import Sidebar from "./Sidebar";
import "../../styles/layout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}

export default MainLayout;