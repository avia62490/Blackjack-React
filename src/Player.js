import { useState, useEffect } from "react";
import Card from "./Card";
import Deck from "./Deck"

export default function Player(props) {
  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  function cardDisplay(setOfCards) {
    const display = setOfCards.map(card => {
      return (
        <Card
        rank={card.rank}
        suit={card.suit} />
      )
    })
    return display
  }

  useEffect(() => {
    const deferAces = [];
    let score = 0;
    const faceCard = /^(Jack|Queen|King)$/;
    props.hand.forEach(card => {
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
    // if(playerScore > 21) {
    //   setPlayerBusted(true)
    //   setIsRoundOver(true)
    // }else if(playerHand.length === 2 && playerScore === 21) {
    //   setBlackjack(true)
    //   setIsRoundOver(true)
    // }
  }, [props.hand])

  return(
    <div>
      <p>{props.designation}</p>
      {cardDisplay(props.hand)}
      <p>The score is: {playerScore}</p>
    </div>
  )
}