import './App.css';
import Deck from './Deck';
import Card from './Card'
import Player from './Player';
import { useState, useEffect } from 'react';

function App() {
  const [sleeve, setSleeve] = useState(Deck);

  const playerComponents = [
    { name: 'DEALER' },
    { name: 'Player 1' },
    { name: 'Player 2' }
  ]

  const getInitialHands = () => {
    const object = {}
    playerComponents.forEach( component => {
      object[component["name"]] = []
    })
    return object
  }
  
  const [hands, setHands] = useState(getInitialHands())
  
  // Works fine for now but slowly loses cards each time it's restocked
  useEffect(() => {
    if(sleeve.length <= 3) {
      setSleeve(Deck);
    }
  }, [sleeve.length])

  //DEAL CARDS FOR NEW ROUND -- WORKS LIKE IT SHOULD!
  function dealCards() {
    const updatedHands = getInitialHands()
    for (let i = 0; i < 2; i++) {
      for (let key in hands) {
        const card = sleeve.shift();
        setSleeve([...sleeve]);
        updatedHands[key].push(card);
        setHands({...updatedHands});
      }
    }
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

  const playerArray = playerComponents.map(player => {
    return(
      <Player 
        key={player.name}
        designation={player.name}
        hands={hands}
        setHands={setHands}
        sleeve={sleeve}
        setSleeve={setSleeve}
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
        {playerArray}
      </div>
    </div>
  );
}

export default App;


// parent level App: sleeve, setSleeve
// pass down sleeve, setSleeve prop to player component
// handleHhit , HandleSaty functions go in player component
// turn, setTurn state at parent level

// Goals 06Jul23
// Deal function
// Stay function for player
// finish player turn logic (stop after busting, decalre blackjack, etc-- conditionally show hit,stay buttons for player)
// add dealer logic to player component
// determine winner at end of round