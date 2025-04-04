import React from 'react';
import Accordion from './Accordion';
import './App.css';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front-end JavaScript library for building user interfaces based on components.'
  },
  {
    title: 'Why use React?',
    content: 'React allows developers to create large web applications that can update and render efficiently in response to data changes.'
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components that contain HTML and JavaScript logic. These components can be nested and reused throughout the application.'
  }
];

function App() {
  return (
    <div className="App">
      <h1>Custom Accordion</h1>
      <Accordion items={items} />
    </div>
  );
}

export default App;