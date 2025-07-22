import React, { useRef, useState } from 'react'
import {StarRating} from "./StarRating"

const App = () => {
  
  return (
     <div className="App">
      <h1>Star Rating Widget</h1>
      <StarRating totalStars={5} />
    </div>
  )
}


export default App