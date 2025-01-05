import { root } from "baobab-react/higher-order";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FontLoader from "./components/FontLoader";
import GoogleCallback from "./components/GoogleCallback";
import Home from "./routes/Home";
import Lobby from "./routes/Lobby";
import Notes from "./routes/Notes";

import "./App.css";
import state from "./state";

class App extends React.PureComponent {
  render() {
    return (
      <FontLoader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
          </Routes>
        </BrowserRouter>
      </FontLoader>
    );
  }
}

export default root(state, App);
