import './App.css';
import Deck from './Deck';
import Card from './Card'
import Result from './Result'
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
  
  function dealCards() {
    // for (const [key, value] of Object.entries(hands["Player 1"])) {
    //   console.log(`${key}: ${value}`)
    // }
    // console.log(hands)
    // hands['Player 1'].forEach(card => {
    //   console.log(card)
    // })
    // hands['Player 1'].push({rank: 'Ace', suit: 'Hearts'})
    // setHands({...hands})

    // playerComponents.forEach(component => {
    //   hands[component].push({rank: 'Ace', suit: 'Hearts'})
    //   setHands({...hands})
    // })
    // console.log(hands['Player 1'])
    // hands['Player 1'].push({rank: 'Ace', suit: 'Hearts'})
    // setHands({...hands})
    for (let key in hands) {
      const card = sleeve.shift()
      setSleeve([...sleeve])
      hands[key].push(card)
      setHands({...hands})
    }
    console.log(hands)
    
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
        {/* <button onClick={drawCard}>Draw Card</button> */}
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

// Goals 06Jul23
// Deal function
// Stay function for player
// finish player turn logic (stop after busting, decalre blackjack, etc-- conditionally show hit,stay buttons for player)
// add dealer logic to player component
// determine winner at end of round