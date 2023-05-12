import './App.css';
import Deck from './Deck';
import Card from './Card'
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPLayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isDealerTurn, setIsDealerTurn] = useState(false)

  // import deck component and set the sleeve to a randomly shuffled set of cards
  useEffect(() => {
    setSleeve(Deck);
    console.log(Deck)
    }, []);

  // Initial dealing, 2 cards for Player and Dealer
  function dealCards() {
    console.log("dealing cards");
    setIsDealerTurn(false)
    for(let i = 0; i < 2; i++) {
      let card = sleeve.shift();
      setSleeve([...sleeve]);
      setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
      let dealerCard = sleeve.shift();
      setSleeve([...sleeve]);
      setDealerHand(prevDealerHand => [...prevDealerHand, dealerCard]);
    }
    console.log(playerHand);
    console.log(dealerHand);
  };

  // use card component to for displaying 'cards' on page, pass in sleeve, playerHand, or 
  // dealerHand as argument, takes up space on page but won't need to later on
  function cardDisplay(setOfCards) {
    const display = setOfCards.map(card => {
      return (
        <Card
        rank={card.rank}
        suit={card.suit} />
      )})
      return display
    }

// find total score for Player
  useEffect(() => {
    let isAcePresent = false
    const result = playerHand.map((element) => {
      if(Number.isInteger(Number(element[0]))) {
        return Number(element[0]);
      } else if (element[0] === "A" && isAcePresent) {
        return 1
      } else if(element[0] === "A") {
        isAcePresent = true
        return 11;
      } else {
        return 10;
      }
    }).reduce((total, current) => total + current, 0)
    // console.log("Score is " + result)
    setPLayerScore(result)
  }, [playerHand, playerScore])

// find total score for Delaer
  useEffect(() => {
    let isAcePresent = false
    const result = dealerHand.map((element) => {
      if(Number.isInteger(Number(element[0]))) {
        return Number(element[0]);
      } else if (element[0] === "A" && isAcePresent) {
        return 1
      } else if(element[0] === "A") {
        isAcePresent = true
        return 11;
      } else {
        return 10;
      }
    }).reduce((total, current) => total + current, 0)
    // console.log("Score is " + result)
    setDealerScore(result)
  }, [dealerHand, dealerScore])

  useEffect(() => {
    if(isDealerTurn && dealerScore < 17) {
      console.log('dealer hits')
      let card = sleeve.shift();
      setSleeve([...sleeve]);
      setDealerHand(prevDealerHand => [...prevDealerHand, card])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDealerTurn, dealerScore])

  // Player hits, gets a card from sleeve
  function playerHit() {
    console.log('player hits')
    let card = sleeve.shift();
    setSleeve([...sleeve]);
    setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
    console.log(playerHand)
  }

  function playerStay() {
    console.log("player stays")
    setIsDealerTurn(true);
  }

  return (
    <div className="App">
      <p>Deck</p>
      {cardDisplay(sleeve)}
      <br></br>
      <button onClick={dealCards}>Deal</button>
      <p>PLayer</p>
      {cardDisplay(playerHand)}
      <br></br>
      Score: {playerScore}
      <br></br>
      <button onClick={playerHit}>Hit</button>
      <button onClick={playerStay}>Stay</button>

      <p>Dealer</p>
      {cardDisplay(dealerHand)}
      Score: {dealerScore}
    </div>
  );
}

export default App;
