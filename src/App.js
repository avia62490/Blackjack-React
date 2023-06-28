import './App.css';
import Deck from './Deck';
import Card from './Card'
import Result from './Result'
import Player from './Player';
import { useState, useEffect } from 'react';

// *****************************************************************
// *****************************************************************
// Right now player component takes in either playerHand or dealerHand
// from App, each component can calcualte the score but I need to
// find a way to differentiate between player and dealer (not just
// with strings) and alter the game logic to make things work again
// *****************************************************************
// *****************************************************************

function App() {
  const [sleeve, setSleeve] = useState([]);
  const [dealtCards, setDealtCards] = useState([]);
  // const [isDealerTurn, setIsDealerTurn] = useState(false);
  // const [isRoundOver, setIsRoundOver] = useState(false);
  

  // import deck component and set the sleeve to a randomly shuffled set of cards
  useEffect(() => {
    setSleeve(Deck);
    }, []);

  // Works fine for now but slowly loses cards each time it's restocked
  useEffect(() => {
    if(sleeve.length <= 3) {
      setSleeve(Deck);
    }
    }, [sleeve.length]);
    
    // Initial dealing, 2 cards for Player and Dealer
  function dealCards() {
    // setIsRoundOver(false);
    console.log("dealing cards");
    setDealtCards(sleeve.splice(0, 4))
    setSleeve([...sleeve])
  };

  // CARD DISPLAY (this is just for the sleeve now, this is also in Player component)
  function cardDisplay(setOfCards) {
    const display = setOfCards.map((card, index) => {
      return (
        <Card
          key={index}
          rank={card.rank}
          suit={card.suit} 
        />
      )})
    return display
  }

  // Player hits, gets a card from sleeve
  function playerHit() {
    console.log('player hits')
  }

  function playerStay() {
    console.log("player stays")
  }
// DISPLAY ********************************************************
  return (
    <div className="App">
      <div className='sleeve'>
        <p>Deck</p>
        {cardDisplay(sleeve)}
      </div>
      <div>
        <button onClick={dealCards}>Deal</button>
        {/* Need to find a way to cycle how cards are dealt to each player, this is just a stop-gap with .slice method */}
        <Player 
          key="2"
          designation="DEALER"
          hand={dealtCards.slice(0, 2)}
        />
        <br></br>
        <Player
          key="1"
          designation="PLAYER"
          hand={dealtCards.slice(2)}
          playerHit={() => playerHit()}
          playerStay={() => playerStay()}
        />


        <Result 
          // isPlayerBusted={playerBusted}
          // isBlackjack={blackjack}
          // isDealerBusted={dealerBusted}
        />
      </div>
    </div>
  );
}

export default App;
