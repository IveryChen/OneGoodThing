import { root } from "baobab-react/higher-order";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GoogleCallback from "./components/GoogleCallback";
import Home from "./routes/Home";
import Lobby from "./routes/Lobby";

import "./App.css";
import state from "./state";

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default root(state, App);
