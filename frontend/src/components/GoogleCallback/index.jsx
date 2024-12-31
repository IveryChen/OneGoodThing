import React from "react";
import { Navigate } from "react-router-dom";
import { Async } from "react-async";

import { withRouter } from "../../utils/withRouter";

class GoogleCallback extends React.PureComponent {
  loadUser = async () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Making request to backend", code);

    const response = await fetch(
      `http://localhost:3000/auth/google/callback?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Auth failed");
    }

    const userData = await response.json();
    console.log("User data:", userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  render() {
    return (
      <Async promiseFn={this.loadUser}>
        {({ data, error, isPending }) => {
          if (isPending) return <div>Loading...</div>;
          if (error) return <div>Error: {error.message}</div>;
          if (data) return <Navigate to="/home" />;
          return null;
        }}
      </Async>
    );
  }
}

export default withRouter(GoogleCallback);
