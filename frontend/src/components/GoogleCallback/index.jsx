import React from "react";
import { Navigate } from "react-router-dom";
import { Async } from "react-async";

import { API_URL } from "../../constants/config";
import state from "../../state";
import { withRouter } from "../../utils/withRouter";

class GoogleCallback extends React.PureComponent {
  requestMade = React.createRef(false);

  loadUser = async () => {
    const cachedData = localStorage.getItem("user");
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    if (this.requestMade.current) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCachedData = localStorage.getItem("user");
      if (newCachedData) {
        return JSON.parse(newCachedData);
      }
      return null;
    }

    this.requestMade.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const response = await fetch(
      `${API_URL}/auth/google/callback?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to authenticate");
    }

    const { user, token } = data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    state.select("user").set(JSON.parse(localStorage.getItem("user")));

    return user;
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
