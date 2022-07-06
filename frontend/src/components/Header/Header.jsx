import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const IS_LOGGED_IN = sessionStorage.getItem("IS_LOGGED_IN") || null;

  return (
    <div className="mainContainer">
      <div className="linksContainer">
        <button
          to="/"
          className="links_button"
          onClick={() => {
            // sessionStorage.removeItem("IS_LOGGED_IN");
            // sessionStorage.removeItem("USER_ID");
            // sessionStorage.removeItem("USER_ID");
            sessionStorage.clear();
            navigate("/");
          }}
        >
          {IS_LOGGED_IN ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
