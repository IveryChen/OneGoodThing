import React from "react";
import { Navigate } from "react-router-dom";
import { Async } from "react-async";

import { API_URL } from "../../constants/config";
import state from "../../state";
import isTokenValid from "../../utils/isTokenValid";
import { withRouter } from "../../utils/withRouter";

class GoogleCallback extends React.PureComponent {
  clearAuth = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    state.select("user").set(null);
  };

  loadUser = async () => {
    try {
      const cachedUser = localStorage.getItem("user");
      const isValid = isTokenValid();

      if (cachedUser && isValid) {
        const user = JSON.parse(cachedUser);
        console.log(user);
        state.select("user").set(user);
        return user;
      }

      // If we get here, either there's no cached data or the token is invalid
      // Clear any stale data
      this.clearAuth();

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        throw new Error("No authorization code found");
      }

      // Make the authentication request
      const response = await fetch(
        `${API_URL}/auth/google/callback?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to authenticate");
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      state.select("user").set(user);

      return user;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
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
