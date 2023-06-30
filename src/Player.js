import { useState, useEffect } from "react";
import Card from "./Card";

export default function Player({designation, playerHand, sleeveAccess}) {
  const [hand, setHand] = useState(playerHand);
  const [score, setScore] = useState(0);
  const [sleeve, setSleeve] = useState(sleeveAccess)
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

  // Updates the state of playerHand to match what is passed down through props
  useEffect(() => {
    setHand(playerHand)
  }, [playerHand])

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
// *******************************************************************
// *******************************************************************
// ----HERE----- Need to figure out a way to pass sleeve from App
// and also have the Hit function here update the sleeve in App
// *******************************************************************
// *******************************************************************
  function playerHit() {
    console.log('player hits')
    console.log(sleeve.shift())
    setSleeve([...sleeve])
    hand.push({rank: 'Ace', suit: 'Hearts'})
    setHand([...hand])
    // console.log(hand)
  }

  function playerStay() {
    console.log("player stays")
  }

  // DISPLAY ******************************
  return(
    <div>
      <p>{designation}</p>
      {/* Buttons only show for the user, not dealer ---- Good
      No functionality yet other than console.log */}
      {/* {designation !== "DEALER" && <button onClick={playerHit}>Hit</button>} */}
       <button onClick={playerHit}>Hit</button>
      {designation !== "DEALER" && <button onClick={playerStay}>Stay</button>}
      {cardDisplay(hand)}
      <p>The score is: {score}</p>
    </div>
  )
}
// playerHand, designation, handleHit, handleStay