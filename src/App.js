import './App.css';
import Deck from './Deck';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  useEffect(() => {
    setSleeve(Deck)
  }, [])
  return (
    <div className="App">
      {sleeve}
    </div>
  );
}

export default App;
