import './App.css';
import Deck from './Deck';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPLayerScore] = useState(0);
  const [dealerrScore, setDealerrScore] = useState(0);

  // import deck component and set the sleeve to a randomly shuffled set of cards
  useEffect(() => setSleeve(Deck), []);

  // Initial dealing, 2 cards for Player and Dealer
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

  useEffect(() => {
    const result = playerHand.map((element) => {
      if(Number.isInteger(Number(element[0]))) {
        return Number(element[0]);
      } else if(element[0] === "A") {
        return 11;
      } else {
        return 10;
      }
    }).reduce((total, current) => total + current, 0)
    console.log(result)
  }, [playerHand, playerScore])

  // Player hits, gets a card from sleeve
  function playerHit() {
    console.log('player hits')
    let card = sleeve.shift();
    setSleeve([...sleeve]);
    setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
  }

  return (
    <div className="App">
      <p>Deck</p>
      {sleeve}
      <br></br>
      <button onClick={dealCards}>Deal</button>
      <p>PLayer</p>
      {playerHand}
      <br></br>
      <button onClick={playerHit}>Hit</button>

      <p>Dealer</p>
      {dealerHand}
    </div>
  );
}

export default App;
