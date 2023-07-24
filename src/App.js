import './App.css';
import lodash from 'lodash'
import Deck from './Deck';
import Card from './Card'
import Player from './Player';
import { useState, useEffect } from 'react';

function App() {
  const shuffledSleeve = lodash.shuffle(Deck);
  
  const playerComponents = [
    { name: 'Player 1' },
    { name: 'Player 2' },
    { name: 'DEALER' }
  ]
  
  const getInitialHands = () => {
    const object = {}
    playerComponents.forEach( component => {
      object[component["name"]] = []
    })
    return object
  }
  
  const [sleeve, setSleeve] = useState(shuffledSleeve);
  const [hands, setHands] = useState(getInitialHands())
  // ----- WORKING ON SETTING TURNS ------
  const [turn, setTurn] = useState(0)
  let activePlayer = playerComponents[turn]
  
  // No longer bleeds cards between reshuffles, will have to adjust value if adding more players
  useEffect(() => {
    if(sleeve.length < 6) {
      setSleeve(shuffledSleeve);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleeve.length])

  // Keeping this here for now just for reference
  function logSleeve() {
    console.log(activePlayer['name'])
  }

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
  const cardDisplay = (setOfCards) => {
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
  
  // Returns player components as they should, with props
  const playerArray = playerComponents.map(player => {
    return(
      <Player 
        key={player.name}
        designation={player.name}
        hands={hands}
        setHands={setHands}
        activePlayer={activePlayer}
        sleeve={sleeve}
        setSleeve={setSleeve}
        setTurn={setTurn}
      />
    )
  })

// *********************** DISPLAY **********************************
// *********************** DISPLAY **********************************
  return (
    <div className="App">
      <div className='sleeve'>
        <p>Deck</p>
        {cardDisplay(sleeve)}
      </div>
      <div>
        <button onClick={dealCards}>Deal</button>
        <button onClick={logSleeve}>Log Sleeve</button>
        {playerArray}
      </div>
    </div>
  );
}

export default App;

// turn, setTurn state at parent level
// HandleSaty functions go in player component

// Goals 06Jul23
// Deal function
// Stay function for player
// finish player turn logic (stop after busting, decalre blackjack, etc-- conditionally show hit,stay buttons for player)
// add dealer logic to player component
// determine winner at end of round