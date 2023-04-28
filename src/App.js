import './App.css';
import Deck from './Deck';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  function dealCards() {
    console.log("dealing cards");
    const card = sleeve.shift();
    setSleeve([...sleeve]);
    setPlayerHand([...playerHand, card]);
    console.log(card);
    console.log(typeof sleeve);
  }
  useEffect(() => {
    setSleeve(Deck)
  }, [])
  return (
    <div className="App">
      <p>Deck</p>
      {sleeve}
      <button onClick={dealCards}>Deal</button>
      <p>PLayer</p>
      {playerHand}
      <p>Dealer</p>
      {dealerHand}
    </div>
  );
}

export default App;
