import { useState, useEffect } from "react";
import Card from "./Card";

export default function Player(props) {
  const [playerHand, setPlayerHand] = useState(props.hand);
  const [playerScore, setPlayerScore] = useState(0);

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
    setPlayerHand(props.hand)
  }, [props.hand])

  // Calcualtes score for the hand
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
  }, [playerHand])

  // DISPLAY ******************************
  return(
    <div>
      <p>{props.designation}</p>
      {cardDisplay(playerHand)}
      <p>The score is: {playerScore}</p>
    </div>
  )
}