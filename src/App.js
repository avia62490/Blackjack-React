import './App.css';
import Deck from './Deck';
import Card from './Card'
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
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

// find total score for Player, accounts for aces being worth 1 or 11
  useEffect(() => {
    const deferAces = [];
    let score = 0;
    const faceCard = /^(Jack|Queen|King)$/;
    playerHand.forEach(card => {
      if(card.rank === "Ace") {
        deferAces.push('Ace');
      } else if(faceCard.test(card.rank)) {
        score += 10
      } else {
        score += card.rank
      }
    })
    if(deferAces) {
      deferAces.forEach(ace => {
        if(score < 11) {
          score += 11
        }else{
          score += 1
        }
      })
    }
    setPlayerScore(score)
  }, [playerHand, playerScore])

// find total score for Delaer, acounts for aces also
  useEffect(() => {
    const deferAces = [];
    let score = 0;
    const faceCard = /^(Jack|Queen|King)$/;
    dealerHand.forEach(card => {
      if(card.rank === "Ace") {
        deferAces.push('Ace');
      } else if(faceCard.test(card.rank)) {
        score += 10
      } else {
        score += card.rank
      }
    })
    if(deferAces) {
      deferAces.forEach(ace => {
        if(score < 11) {
          score += 11
        }else{
          score += 1
        }
      })
    }
    setDealerScore(score)
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
