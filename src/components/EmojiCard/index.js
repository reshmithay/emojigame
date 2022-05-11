// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onEmojiClick} = props
  const {id, emojiUrl, emojiName} = emojiDetails

  const onClickEmoji = () => {
    onEmojiClick(id)
  }

  return (
    <li className="emoji-item">
      <button type="button" className="emoji-btn" onClick={onClickEmoji}>
        <img src={emojiUrl} alt={emojiName} className="emoji-image" />
      </button>
    </li>
  )
}

export default EmojiCard
