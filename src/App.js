import './App.css';
import Deck from './Deck';
import Card from './Card'
import Result from './Result'
import Player from './Player';
import { useState, useEffect, useRef } from 'react';

// *****************************************************************
// *****************************************************************
// USEREFS--- could possibly cycle through and perform hit function for each player in order to deal cards, refer to notes. Player hit function is working well now (it calls drawCard from parent and updates individual hand state)
// *****************************************************************
// *****************************************************************

function App() {
  const [sleeve, setSleeve] = useState(Deck);
  const playerRefs = useRef([]);
  const [playerComponents, setPlayerComponents] = useState( [
    { id: 3, name: 'DEALER' },
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' }
  ]);

  // Works fine for now but slowly loses cards each time it's restocked
  useEffect(() => {
    if(sleeve.length <= 3) {
      setSleeve(Deck);
    }
  }, [sleeve.length])

  function drawCard(id) {
    let drawnCard = sleeve.shift()
    console.log(id, 'player hits')
    setSleeve([...sleeve])
    return drawnCard
  }
  
  // THIS DOES NOT WORK, GOING TO TRY USEREF TO CALL PLAYER FUNVTION
  function dealCards() {
    playerComponents.forEach(player => {
      player.handleHit()
    })
  }

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

  const playerArray = playerComponents.map(player => {
    return(
      <Player 
        key={player.id}
        designation={player.name}
        playerHand={[]}
        handleHit={() => drawCard(player.id)}
      />
    )
  })

// DISPLAY ********************************************************
  return (
    <div className="App">
      <div className='sleeve'>
        <p>Deck</p>
        {cardDisplay(sleeve)}
      </div>
      <div>
        <button onClick={dealCards}>Deal</button>
        <button onClick={drawCard}>Draw Card</button>
        {playerArray}

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