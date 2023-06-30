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

  // Card Display (this is just for the sleeve now, this is also in Player component)
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
// WORKING TO MAKE PLAYER FUNCTION TO DISPLAY PLAYER COMPONENT, PROPS ARE PASSED THROUGH AS FUNCTION PARAMETERS

  const player = (id, designation, cards) => {
    return (
      <Player 
        key={id}
        designation={designation}
        // handleHit={() => handleHit(id, cards)}
        // handleStay={() => handleStay()}
        playerHand={cards}
      />
    )
  }

  // Player hits, gets a card from sleeve
  // function handleHit(id, hand) {
  //   console.log('player hits', id)
  //   hand.push(sleeve.shift())
  //   console.log(hand)
  // }

  // function handleStay() {
  //   console.log("player stays")
  // }
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
        
        {player(2, "DEALER", dealtCards.slice(0, 2))}
        <br></br>
        
        {player(1, "Player", dealtCards.slice(2))}


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


// parent level App: sleeve, setSleeve
// pass down sleeve, setSleeve prop to player component
// handleHhit , HandleSaty functions go in player component
// turn, setTurn state at parent level