import '../styles/ClickableText.css'
import classNames from 'classnames'

type Props = {
    text: string
    onClick: () => void
    className?: string
}

const ClickableText = ({text, onClick, className}: Props) => <button className={classNames(`ClickableText`, className)} onClick={onClick}>{text}</button>

export default ClickableText