import React, { useEffect, useRef, useState } from 'react';
import { CONTROL_KEYS } from '../constants/keys';
import { OPPOSITE_DIRECTIONS, STARTING_DIRECTION, STARTING_HEAD_POSITION, NEW_MINE_DISTANCE_FROM_HEAD } from '../constants/rules';
import { generateRandomAvailableCoords, findCellsInRadius } from '../helpers/board';
import { generateStartingSnakeTailCoords, findNextHeadPosition, isEatingApple, isGameOver } from '../helpers/game';
import { calculatePointsForEatingApple } from '../helpers/score';
import styles from '../styles/Game.module.scss';
import { Coords, Key } from '../types/types';
import Grid from './Grid';
import Score from './Score';
import useKeyClick from '../hooks/useKeyClick';
import { useDispatch } from 'react-redux';
import { increaseScore, setGameOver } from '../redux/slices';
import { useSelector } from '../redux/hooks';
import useHighScore from '../hooks/useHighScore';
import useGoToMenu from '../hooks/useGoToMenu';

const Game = () => {
    const { score, settings } = useSelector()
    const dispatch = useDispatch()
    useGoToMenu()
    const [moveRefresh, setMovesRefresh] = useState(settings.STARTING_MOVE_REFRESH_MS.real as number);
    const [headCoords, setHeadCoords] = useState<Coords>(STARTING_HEAD_POSITION)
    const [tailCoords, setTailCoords] = useState<Coords[]>(generateStartingSnakeTailCoords(settings.STARTING_LENGTH.real as number, STARTING_HEAD_POSITION, STARTING_DIRECTION))

    const [, setApplesEaten] = useState(0);
    const [appleCoords, setAppleCoords] = useState(generateRandomAvailableCoords([headCoords, ...tailCoords]));

    const [mineCoords, setMineCoords] = useState<Coords[]>([])

    const keyRef = useRef(STARTING_DIRECTION)
    const forbiddenDirectionRef = useRef<string | null>(null)
    const lastHeadPositionRef = useRef<Coords>(headCoords)
    const keyFired = useRef(false)
    const [, maybeSetHighScore] = useHighScore()

    const gameIteration = () => {
        snakeMoveIteration()
        const gameOverReason = isGameOver(headCoords, tailCoords, mineCoords, settings.WALLS.real as boolean)
        if (gameOverReason) {
            maybeSetHighScore(score)
            dispatch(setGameOver(gameOverReason))

        }
        if (isEatingApple(headCoords, appleCoords)) {
            eatApple()
        }
    }

    useEffect(() => {
        const moveTimeout = setTimeout(gameIteration, moveRefresh)
        return () => {
            clearTimeout(moveTimeout)
        }
    }, [moveRefresh, headCoords.x, headCoords.y])  //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const mineInterval = setInterval(deployNewMine, settings.NEW_MINE_INTERVAL_MS.real as number)
        return () => {
            clearInterval(mineInterval)
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const handleKeydown = (e: KeyboardEvent) => {
        if ((CONTROL_KEYS as string[]).includes(e.key) && !keyFired.current) {
            keyFired.current = true
            setLastKey(e.key as Key)
        }
    }

    const handleKeyup = () => {
        keyFired.current = false
    }

    useKeyClick(handleKeydown, handleKeyup)

    const setLastKey = (key: Key) => {
        if (key === forbiddenDirectionRef.current || key === keyRef.current) return
        keyRef.current = key
    }

    const setLastHeadPosition = () => {
        lastHeadPositionRef.current = headCoords
    }

    const deployNewMine = () => {
        const cellsNearHead = NEW_MINE_DISTANCE_FROM_HEAD ? findCellsInRadius(NEW_MINE_DISTANCE_FROM_HEAD, lastHeadPositionRef.current, settings.WALLS.real as boolean) : []
        setMineCoords(prev => [...prev, generateRandomAvailableCoords([appleCoords, headCoords, ...tailCoords, ...cellsNearHead])])
    }

    const snakeMoveIteration = () => {
        setLastHeadPosition()
        moveHead()
        moveTail()
        forbiddenDirectionRef.current = OPPOSITE_DIRECTIONS[keyRef.current]
    }

    const moveHead = () => {
        setHeadCoords(prev => findNextHeadPosition(prev, keyRef.current, settings.WALLS.real as boolean))
    }

    const moveTail = () => {
        setTailCoords(prev => [lastHeadPositionRef.current, ...(isEatingApple(headCoords, appleCoords) ? prev : prev.slice(0, -1))])
    }

    const eatApple = () => {
        setApplesEaten(prev => {
            if (!((prev + 1) % (settings.APPLES_TO_SPEED_UP_SNAKE.real as number))) speedUpSnake()
            return prev + 1
        })
        placeNewApple()
        dispatch(increaseScore(calculatePointsForEatingApple(tailCoords.length + 1, moveRefresh, mineCoords.length)))
    }

    const placeNewApple = () => {
        setAppleCoords(generateRandomAvailableCoords([headCoords, ...tailCoords, ...mineCoords, appleCoords]))
    }

    const speedUpSnake = () => {
        setMovesRefresh(prev => prev / (settings.SNAKE_SPEED_MULTIPLIER.real as number))
    }

    return (
        <div className={styles.game}>
            <Score score={score} />
            <Grid apple={appleCoords} snakeHead={headCoords} snakeTail={tailCoords} mines={mineCoords} isWalls={settings.WALLS.real as boolean} />
        </div>
    )
}

export default Game