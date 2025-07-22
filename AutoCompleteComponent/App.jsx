import React, { useRef, useState } from 'react'
import { AutoComplete } from "./AutoComplete"

const App = () => {
  const options = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];
  
  return (
    <div className="App1">
      <h1>Autocomplete Component</h1>
      <AutoComplete options={options} />
    </div>
  )
}


export default App