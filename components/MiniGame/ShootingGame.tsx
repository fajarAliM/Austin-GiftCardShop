import React, { useEffect, useRef, useState } from 'react';

interface Spaceship {
    x: number;
    y: number;
    size: number;
    speed: number;
}

interface Bullet {
    x: number;
    y: number;
    speed: number;
}

interface Alien {
    x: number;
    y: number;
    size: number;
    destroyed: boolean;
    speed: number;
}

interface MiniGameProps {
    stop: boolean;
    handleDisplay: (value: boolean) => void;
}

export default function ShootingGame({ stop, handleDisplay }: MiniGameProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [gameOverMessage, setGameOverMessage] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [aliens, setAliens] = useState<Alien[]>([]);

    useEffect(() => {
        if (stop) {
            handleDisplay(true);
        }
    }, [stop]);

    useEffect(() => {
        let isGameOver = false;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const spaceship: Spaceship = { x: canvas.width / 2, y: canvas.height - 30, size: 20, speed: 8 };
        let bullets: Bullet[] = [];
        let alienBullets: Bullet[] = [];
        let alienDirection: number = 1; // 1 for right, -1 for left
        let rightPressed = false;
        let leftPressed = false;

        const numAliens = 6;

        if (!gameOver && aliens.length === 0) {
            for (let i = 0; i < numAliens; i++) {
                aliens.push({
                    x: i * (canvas.width / numAliens) + 20,
                    y: 50,
                    size: 20,
                    destroyed: false,
                    speed: 1 // Horizontal movement speed
                });
            }
        } else {
            const newAli: Alien[] = [];

            for (let i = 0; i < numAliens; i++) {
                newAli.push({
                    x: i * (canvas.width / numAliens) + 20,
                    y: 50,
                    size: 20,
                    destroyed: false,
                    speed: 1 // Horizontal movement speed
                });
            }

            setAliens(newAli);
        }

        function keyDownHandler(e: KeyboardEvent) {
            if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
            else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
        }

        function keyUpHandler(e: KeyboardEvent) {
            if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
            else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
        }

        function gameLoop() {
            if (gameOver || isGameOver) return;

            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            drawSpaceship();
            moveSpaceship();
            handleBullets();
            handleAliens();
            handleAlienBullets();
            checkWinCondition();
            requestAnimationFrame(gameLoop);
        }

        function drawSpaceship() {
            if (!ctx) return;
            ctx.fillStyle = "white";
            // ctx.beginPath();
            // ctx.moveTo(spaceship.x, spaceship.y);
            // ctx.lineTo(spaceship.x - spaceship.size / 2, spaceship.y + spaceship.size);
            // ctx.lineTo(spaceship.x + spaceship.size / 2, spaceship.y + spaceship.size);
            // ctx.closePath();
            // ctx.fill();

            ctx.font = "25px Arial";
            ctx.fillText("🛸", spaceship.x - spaceship.size / 2 - 7, spaceship.y + spaceship.size + 5);
        }

        function moveSpaceship() {
            if (canvas) {
                if (rightPressed && spaceship.x < canvas.width - spaceship.size / 2) spaceship.x += spaceship.speed;
                else if (leftPressed && spaceship.x > spaceship.size / 2) spaceship.x -= spaceship.speed;
            }
        }

        function handleBullets() {
            if (Math.random() < 0.05) bullets.push({ x: spaceship.x, y: spaceship.y, speed: -5 });
            bullets.forEach(bullet => {
                bullet.y += bullet.speed;
                if (ctx) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(bullet.x, bullet.y, 2, 10);
                }
            });
            bullets = bullets.filter(bullet => bullet.y > 0);
        }

        function handleAliens() {
            aliens.forEach(alien => {
                if (!alien.destroyed) {
                    if (ctx) {
                        ctx.font = "20px Arial";
                        ctx.fillText("👾", alien.x, alien.y);
                    }

                    alien.x += alien.speed * alienDirection;

                    if (canvas && (alien.x <= 0 || alien.x >= canvas.width - alien.size)) {
                        alienDirection *= -1;

                        if (alien.y >= spaceship.y) {
                            isGameOver = true;
                            endGame("Sorry, try again!");
                        }

                        aliens.forEach(alien => (alien.y += 10));
                    }

                    if (Math.random() < 0.01) alienBullets.push({ x: alien.x, y: alien.y, speed: 3 });

                    bullets.forEach(bullet => {
                        if (Math.hypot(bullet.x - alien.x, bullet.y - alien.y) < alien.size) {

                            alien.destroyed = true;
                            bullets.splice(bullets.indexOf(bullet), 1);
                        }
                    });
                }
            });
        }

        function handleAlienBullets() {
            alienBullets.forEach(alienBullet => {
                alienBullet.y += alienBullet.speed;
                if (ctx) {
                    ctx.fillStyle = "green";
                    ctx.fillRect(alienBullet.x, alienBullet.y, 4, 10);

                    if (Math.hypot(alienBullet.x - spaceship.x, alienBullet.y - spaceship.y) < spaceship.size) {
                        isGameOver = true;
                        endGame("Sorry, try again!");
                    }
                }
            });
            alienBullets = alienBullets.filter(bullet => canvas && bullet.y < canvas.height);
        }

        function checkWinCondition() {
            if (aliens.length === 0) return;

            if (aliens.every(alien => alien.destroyed === true)) {

                isGameOver = true;
                endGame("Congratulations, you won! Your ScoreCard has been unlocked!");
                handleDisplay(true);
            }
        }

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        gameLoop();

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, [gameOver]);

    function initGame() {
        setGameOver(false);
        setGameOverMessage("");
    }

    function endGame(message: string) {
        setGameOver(true);
        setGameOverMessage(message);
    }

    return (
        <div style={{ position: "relative", width: "80%", height: "400px", margin: "auto", backgroundColor: "#000" }}>
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} onClick={() => gameOver && initGame()}></canvas>
            {gameOver && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontSize: "1.5rem",
                        textAlign: "center"
                    }}
                >
                    {gameOverMessage}
                    <br />
                    <span style={{ fontSize: "1rem" }}>Click to play again</span>
                </div>
            )}
        </div>
    );
}