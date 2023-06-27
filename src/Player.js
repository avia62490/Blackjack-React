import { useState, useEffect } from "react";
import Card from "./Card";

export default function Player(props) {
  const [playerHand, setPlayerHand] = useState([]);

  function cardDisplay(setOfCards) {
    const display = setOfCards.map(card => {
      return (
        <Card
        rank={card.rank}
        suit={card.suit} />
      )})
    return display
  }

  return(
    <div>
      <p>{props.designation}</p>
      {cardDisplay([{rank: 'Ace', suit: 'Clubs'}, {rank: 10, suit: 'Hearts'}])}
    </div>
    
  )
}