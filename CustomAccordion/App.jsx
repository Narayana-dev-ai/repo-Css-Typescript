import React from "react";
import Accordion from "./Accordion";

export function App(props) {
  const items = [
    {
      title: "What is React?",
      content:
        "React is a front-end JavaScript library for building user interfaces based on components.",
    },
    {
      title: "Why use React?",
      content:
        "React allows developers to create large web applications that can update and render efficiently in response to data changes.",
    },
    {
      title: "How do you use React?",
      content:
        "You use React by creating components that produce HTML, which then get inserted into the DOM.",
    },
  ];

  return (
    <div className="App">
      <h1>Hello React.</h1>
      <Accordion items={items} />
    </div>
  );
}

// Log to console
console.log("Hello console");
