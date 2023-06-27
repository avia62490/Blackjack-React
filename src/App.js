import './App.css';
import Deck from './Deck';
import Card from './Card'
import Result from './Result'
import Player from './Player';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [blackjack, setBlackjack] = useState(false)
  const [playerBusted, setPlayerBusted] = useState(false)
  const [dealerBusted, setDealerBusted] = useState(false)

  // import deck component and set the sleeve to a randomly shuffled set of cards
  useEffect(() => {
    setSleeve(Deck);
    // console.log(sleeve.length)
    }, []);

  useEffect(() => {
    if(sleeve.length <= 3) {
      setSleeve(Deck);
    }
    }, [sleeve.length]);
    
    // Initial dealing, 2 cards for Player and Dealer
  function dealCards() {
    setIsDealerTurn(false);
    setIsRoundOver(false);
    setPlayerScore(0)
    setDealerScore(0)
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerBusted(false);
    setDealerBusted(false);
    setBlackjack(false);
    console.log("dealing cards");

    for(let i = 0; i < 2; i++) {
      let card = sleeve.shift();
      setSleeve([...sleeve]);
      setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
      let dealerCard = sleeve.shift();
      setSleeve([...sleeve]);
      setDealerHand(prevDealerHand => [...prevDealerHand, dealerCard]);
    }
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
    // this has resolved blackjack status issue not being called in correct round ---- GOOD!!
    if(playerScore > 21) {
      setPlayerBusted(true)
      setIsRoundOver(true)
    }else if(playerHand.length === 2 && playerScore === 21) {
      setBlackjack(true)
      setIsRoundOver(true)
    }
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
    if(dealerScore > 21) {
      setDealerBusted(true)
      setIsRoundOver(true)
    }
  }, [dealerHand, dealerScore])

// DEALER'S TURN
useEffect(() => {
    if(isDealerTurn && dealerScore < 17) {
      console.log('dealer hits')
      let card = sleeve.shift();
      setSleeve([...sleeve]);
      setDealerHand(prevDealerHand => [...prevDealerHand, card])
    } else if(isDealerTurn && dealerScore <= 21) {
      console.log('dealer stays')
      setIsRoundOver(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDealerTurn, dealerScore])

// END OF ROUND SCENARIOS
  useEffect(() => {
    if(isRoundOver) {
      if(playerBusted) {
        console.log("player busted!")
      } else if(dealerBusted) {
        console.log("dealer BUsted!")
      } else if(blackjack) {
        console.log("player got BlackJAck!!!")
      } else if(playerScore > dealerScore) {
        console.log('player wins')
      } else if(playerScore === dealerScore) {
        console.log('push')
      } else if(playerScore < dealerScore) {
        console.log('dealer wins')
      }
    }
  })

  // Player hits, gets a card from sleeve
  function playerHit() {
    console.log('player hits')
    let card = sleeve.shift();
    setSleeve([...sleeve]);
    setPlayerHand(prevPlayerHand => [...prevPlayerHand, card])
  }

  function playerStay() {
    console.log("player stays")
    setIsDealerTurn(true);
  }
// DISPLAY ********************************************************
  return (
    <div className="App">
      <div className='sleeve'>
        <p>Deck</p>
        {cardDisplay(sleeve)}
      </div>
      <div>
        <Player />
        <button onClick={dealCards}>Deal</button>
        <p>PLayer</p>
        {cardDisplay(playerHand)}
        <br></br>
        Score: {playerScore}
        <br></br>
        {!isRoundOver && !isDealerTurn && <button onClick={playerHit}>Hit</button>}
        {!isRoundOver && !isDealerTurn && <button onClick={playerStay}>Stay</button>}

        <p>Dealer</p>
        {cardDisplay(dealerHand)}
        Score: {dealerScore}

        <Result 
          isPlayerBusted={playerBusted}
          isBlackjack={blackjack}
          isDealerBusted={dealerBusted}
          />
      </div>
    </div>
  );
}

export default App;
