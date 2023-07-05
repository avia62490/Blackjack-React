import { useState, useEffect } from "react";
import Card from "./Card";

export default function Player({designation, handleHit}) {
  const [hand, setHand] = useState([]);
  const [score, setScore] = useState(0);
  const faceCard = /^(Jack|Queen|King)$/;

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

  const calculateCardValue = (card) => {
    return faceCard.test(card.rank) ? 10 : card.rank
  }

  // CALCULATE SCORE FOR CURRENT HAND
  useEffect(() => {
    const deferAces = [];
    let score = 0;
    hand.forEach(card => {
      card.rank === "Ace" ? deferAces.push('Ace') : score += calculateCardValue(card)
    })
    // auto adjusts value of aces in hand
    deferAces.forEach(ace => {
      score < 11 ? score += 11 : score += 1
    })
    
    setScore(score)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hand])

  function playerHit() {
    let card = handleHit()
    setHand([...hand, card])
  }

  function playerStay() {
    console.log("player stays")
  }

  // DISPLAY ******************************
  return(
    <div>
      <p>{designation}</p>
      {designation !== "DEALER" && <button onClick={playerHit}>Hit</button>}
      {designation !== "DEALER" && <button onClick={playerStay}>Stay</button>}
      {cardDisplay(hand)}
      <p>The score is: {score}</p>
    </div>
  )
}
// playerHand, designation, handleHit, handleStay