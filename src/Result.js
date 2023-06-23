export default function Result({isPlayerBusted, isBlackjack, isDealerBusted}) {
  const showResult = () => {
    if (isPlayerBusted) {
      return "Player has busted!"
    } else if (isBlackjack) {
      return "Player has Blackjack!"
    } else if (isDealerBusted) {
      return "Dealer has busted!"
    }
  }
  return(
    <div>
      <p>{showResult()}</p>
    </div>
  )
}
// {playerBusted && <p>Player has busted</p>}
//         {blackjack && <p>Player has BLACKJACK!</p>}
//         {dealerBusted && <p>dealer has busted</p>}