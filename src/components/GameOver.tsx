import '../styles/GameOver.css'
import ClickableText from './ClickableText'
import React from 'react'
import { useSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { setGameState, setNewGame } from '../redux/slices'
import useHighScore from '../hooks/useHighScore'
import { GameOverReason } from '../types/types'

const GAME_OVER_LABELS: Record<GameOverReason, string> = { wall: "You crashed into a wall", tail: "You bit your own tail", mine: "You stepped on a mine" }

const LABELS = {
    again: "TRY AGAIN",
    newHighScore: "Congrats! It's your new high score!",
    menu: "MAIN MENU",
    title: "GAME OVER",
    highScore: "Your high score:",
    score: "Score:",
}

const GameOver = () => {
    const { lastGameOverReason: reason, score } = useSelector()
    const [highScore, ] = useHighScore()
    const dispatch = useDispatch()

    return <div className="GameOver">
        <div className="GameOver__wrapper">
            <h1 className="GameOver__title">{LABELS.title}</h1>
            <h6>{GAME_OVER_LABELS[reason]}!</h6>
            <h5>{LABELS.score} {score}</h5>
            {highScore > score ? <h6>{LABELS.highScore} {highScore}</h6> : <h6>{LABELS.newHighScore}</h6>}
            <div className="GameOver__options">
                <ClickableText className="GameOver__again" text={LABELS.again} onClick={() => dispatch(setNewGame())} />
                <ClickableText className="GameOver__settings" text={LABELS.menu} onClick={() => dispatch(setGameState('settings'))} />
            </div>
        </div>
    </div>
}

export default GameOver