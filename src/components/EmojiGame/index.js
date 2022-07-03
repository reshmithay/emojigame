import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {
    emojiClickedList: [],
    topScore: 0,
    isGameOn: true,
  }

  renderWinOrLoseCard = () => {
    const {emojiClickedList} = this.state
    const {emojisList} = this.props
    const isWon = emojiClickedList.length === emojisList.length

    return (
      <WinOrLoseCard
        score={emojiClickedList.length}
        isWon={isWon}
        onClickPlayAgain={this.onClickPlayAgain}
      />
    )
  }

  onClickPlayAgain = () => {
    this.setState({
      emojiClickedList: [],
      isGameOn: true,
    })
  }

  onEmojiClick = id => {
    const {emojisList} = this.props
    const {emojiClickedList} = this.state

    if (emojiClickedList.includes(id)) {
      const {topScore} = this.state
      let newTopScore = topScore
      if (emojiClickedList.length > topScore) {
        newTopScore = emojiClickedList.length
      }
      this.setState({isGameOn: false, topScore: newTopScore})
    } else {
      if (emojisList.length - 1 === emojiClickedList.length) {
        const {topScore} = this.state
        let newTopScore = topScore
        if (emojisList.length > topScore) {
          newTopScore = emojisList.length
        }
        this.setState({isGameOn: false, topScore: newTopScore})
      }
      this.setState(previousState => ({
        emojiClickedList: [...previousState.emojiClickedList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiCard = () => {
    const shuffledList = this.getShuffledEmojisList()
    return (
      <ul className="emoji-cards-list">
        {shuffledList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            onEmojiClick={this.onEmojiClick}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {emojiClickedList, topScore, isGameOn} = this.state
    return (
      <div className="app-container">
        <NavBar
          score={emojiClickedList.length}
          topScore={topScore}
          isGameOn={isGameOn}
        />
        {isGameOn && (
          <div className="game-instructions">
            <p className="game-line">
              How about you test your memory power with this game?
            </p>
            <p className="how-to-play">
              <span className="span-1">How-to-play: </span> Try not to click on
              previously clicked emojis to win!
            </p>

            <p className="span">Are you ready?</p>
          </div>
        )}
        <div className="emoji-body">
          {isGameOn ? this.renderEmojiCard() : this.renderWinOrLoseCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
