import React, { useRef, useState } from "react";
import Confetti from "js-confetti";
import "./style.css";
import { FileExplorer } from "./Routes";

const confetti = new Confetti();

const App = () => {
  return <FileExplorer />;
};

export default App;
