import React from "react";
import { Link } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href("/");
};
function UserPage() {
  return (
    <div>
      {" "}
      <Link to="/" className="sidebar_links" onClick={() => logout()}>
        Logout
      </Link>
    </div>
  );
}

export default UserPage;
