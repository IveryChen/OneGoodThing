import React from "react";
import { Navigate } from "react-router-dom";
import { Async } from "react-async";

import { API_URL } from "../../constants/config";
import state from "../../state";
import isTokenValid from "../../utils/isTokenValid";
import { withRouter } from "../../utils/withRouter";

class GoogleCallback extends React.PureComponent {
  controller = new AbortController();

  componentWillUnmount() {
    this.controller.abort();
  }

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
        state.select("user").set(user);
        return user;
      }

      this.clearAuth();

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        throw new Error("No authorization code found");
      }

      const response = await fetch(
        `${API_URL}/auth/google/callback?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: this.controller.signal,
        }
      );

      const data = await response.json();

      // If the code was already used but we have a user in localStorage,
      // it means the first request succeeded, so we can just return that user
      if (!response.ok) {
        if (data.error === "Authorization code has already been used") {
          const cachedUser = localStorage.getItem("user");
          if (cachedUser) {
            return JSON.parse(cachedUser);
          }
        }
        throw new Error(data.error || "Authentication failed");
      }

      const { user, token } = data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      state.select("user").set(user);

      return user;
    } catch (error) {
      if (error.name === "AbortError") {
        return; // Ignore abort errors
      }
      this.clearAuth();
      throw error;
    }
  };

  render() {
    return (
      <Async promiseFn={this.loadUser}>
        {({ data, error, isPending }) => {
          if (isPending) {
            return <div>Loading...</div>;
          }
          if (error) {
            return <div>Error: {error.message}</div>;
          }
          if (data) {
            return <Navigate to="/home" replace />;
          }
          return <div>Something went wrong...</div>;
        }}
      </Async>
    );
  }
}

export default withRouter(GoogleCallback);
