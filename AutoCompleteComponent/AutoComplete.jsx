import React, {useState} from "react"
import './AutoComplete.css'

export const AutoComplete = ({options}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value)
    if(value.length > 0) {
      const filteredSuggestions = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleClickSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  }

  
  return <div className="autocomplete">
    <input 
      type="text"
      placeholder="Type to search..." 
      value={input} 
      onChange={handleInputChange}
    />
    {
      suggestions.length > 0 &&(
        <ul className="suggestions">
          {
            suggestions.map((item, index) => (
              <li key={index} onClick={() => handleClickSuggestion(item)}>
                {item}
              </li>
            ))
          }
        </ul>
      )
    }
  </div>
}