import { useState, useEffect } from "react";
import Card from "./Card";

export default function Player({activePlayer, designation, hands, setHands, sleeve, setSleeve, setTurn}) {
  // const [hand, setHand] = useState([]);
  const [score, setScore] = useState(0);
  const faceCard = /^(Jack|Queen|King)$/;
  const isActive = activePlayer['name'] === designation

  function cardDisplay(setOfCards) {
    const display = setOfCards.map((card, index) => {
      return (
        <Card
          key={index}
          rank={card.rank}
          suit={card.suit} 
        />
      )
    })
    return display
  }

  function playerHit() {
    let drawnCard = sleeve.shift()
    console.log(`${designation} hits`)
    setSleeve([...sleeve])
    setHands({...hands, [designation]: [...hands[designation], drawnCard]})
  }

  const calculateCardValue = (card) => {
    return faceCard.test(card.rank) ? 10 : card.rank
  }

  // CALCULATE SCORE FOR CURRENT HAND
  useEffect(() => {
    const deferAces = [];
    let score = 0;
    hands[designation].forEach(card => {
      card.rank === "Ace" ? deferAces.push('Ace') : score += calculateCardValue(card)
    })
    // auto adjusts value of aces in hands
    deferAces.forEach(ace => {
      score < 11 ? score += 11 : score += 1
    })
    
    setScore(score)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hands])

  function playerStay() {
    console.log("player stays")
    setTurn(prevTurn => prevTurn + 1)
  }

  // DISPLAY ******************************
  return(
    <div>
      <p style={{ fontWeight: isActive ? 'bold' : 'normal'}}>{designation}</p>
      {designation !== "DEALER" && isActive && <button onClick={playerHit}>Hit</button>}
      {designation !== "DEALER" && isActive && <button onClick={playerStay}>Stay</button>}
      {cardDisplay(hands[designation])}
      <p>The score is: {score}</p>
    </div>
  )
}
// playerHand, designation, handleHit, handleStay