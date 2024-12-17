import React, { useState, useEffect } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';

interface MiniGameProps {
    stop: boolean;
    handleDisplay: (value: boolean) => void;
}

const GameBoard = ({ stop, handleDisplay }: MiniGameProps) => {
    const [playerPaddle, setPlayerPaddle] = useState({ x: 0, y: 200 });
    const [computerPaddle, setComputerPaddle] = useState({ x: 788, y: 200 });
    const [ball, setBall] = useState({ x: 385, y: 235, dx: 2, dy: 2 });
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    // Handle player paddle movement
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            setPlayerPaddle((prev) => ({ ...prev, y: Math.max(prev.y - 20, 0) }));
        } else if (e.key === 'ArrowDown') {
            setPlayerPaddle((prev) => ({ ...prev, y: Math.min(prev.y + 20, 400) }));
        }
    };

    const pauseGame = () => {
        setGameStarted(false);
        setScore(0);
    }

    // Update ball position and handle collisions
    useEffect(() => {
        if (!gameStarted) {
            return;
        }

        const interval = setInterval(() => {
            setBall((prev) => {
                let newX = prev.x + prev.dx;
                let newY = prev.y + prev.dy;

                // Ball collision with top and bottom walls
                if (newY <= 0 || newY >= 470) {
                    newY = prev.y;
                    prev.dy = -prev.dy;
                }

                if (newX <= 0) {
                    setScore((prev) => prev - 0.5);
                    newX = 385;
                    newY = 235;
                }

                // Ball collision with paddles
                if (
                    (newX <= playerPaddle.x + 10 && newY >= playerPaddle.y && newY <= playerPaddle.y + 100) ||
                    (newX >= computerPaddle.x - 30 && newY >= computerPaddle.y && newY <= computerPaddle.y + 100)
                ) {
                    if (newX <= playerPaddle.x + 10 && newY >= playerPaddle.y && newY <= playerPaddle.y + 100) {
                        setScore((prev) => prev + 1);
                    }
                    newX = prev.x;
                    prev.dx = -prev.dx;
                }

                // Update computer paddle position
                setComputerPaddle((comp) => ({ ...comp, y: Math.min(Math.max(newY - 50, 0), 400) }));

                return { ...prev, x: newX, y: newY };
            });
        }, (20 - score));

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStarted, playerPaddle, computerPaddle, score]);

    useEffect(() => {
        if (score < 0) {
            pauseGame();
        } else if (score >= 10) {
            setGameStarted(false);
            handleDisplay(true);
        }
    }, [handleDisplay, score]);

    useEffect(() => {
        if (stop) {
            pauseGame();
            handleDisplay(true);
        }
    }, [handleDisplay, stop]);

    return (
        <div className='relative'>
            <div className='game-container'>
                <p className='game-score'>Score: {score} <br /> <span className='text-indigo-500 text-lg'>speed x {(score / 2).toFixed(1)}</span></p>
                <Paddle position={playerPaddle} />
                <Paddle position={computerPaddle} />
                <Ball position={ball} />
            </div>
            {!gameStarted && <div className='game-controls'>
                {score >= 10 && <p className='text-3xl font-bold text-black text-center py-4 -mt-12 drop-shadow-lg'>You Win!!!</p>}
                <button onClick={() => setGameStarted(true)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl">
                    Game Start
                </button>
            </div>}
        </div>
    );
};

export default GameBoard;