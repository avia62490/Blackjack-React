import './App.css';
import Deck from './Deck';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  function dealCards() {
    console.log("dealing cards");
    for(let i = 0; i < 2; i++) {
      let card = sleeve.shift();
      setSleeve([...sleeve]);
      setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
      let dealerCard = sleeve.shift();
      setSleeve([...sleeve]);
      setDealerHand(prevDealerHand => [...prevDealerHand, dealerCard]);
    }
    console.log(sleeve.length);
  };

  useEffect(() => setSleeve(Deck), []);

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
