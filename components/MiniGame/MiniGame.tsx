import './game.css';
import { useEffect, useState } from "react";

interface MiniGameProps {
  stop: boolean;
  handleDisplay: (value: boolean) => void;
}

const MiniGame = ({ stop, handleDisplay }: MiniGameProps) => {
  const START_TIME = 10;
  const passNumber = 40;
  const [timer, setTimer] = useState(START_TIME);
  const [number, setNumber] = useState(0);
  const [gamestart, setGamestart] = useState(false);
  const [startbtn, setStartbtn] = useState("GAME START");
  const [overbtn, setoverbtn] = useState("CLICKKK");

  const Gamestate = () => {
    setGamestart(true);
    setNumber(0);
    setStartbtn("GAME START");
    setoverbtn("CLICKKK");
  }

  const GameOver = () => {
    setGamestart(false);
    setTimer(START_TIME);
    setStartbtn("RESTART");

    if (number >= passNumber) {
      setoverbtn("YOU WIN!");
      handleDisplay(true);
    } else {
      setoverbtn("TIME'S UP");
    }
  }
  
  useEffect(() => {
    if (stop) {
      handleDisplay(true);
    }
  }, [stop]);

  useEffect(() => {
    if (timer > 0 && gamestart) {
      setTimeout(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      GameOver();
    }
  }, [timer, gamestart]);

  const colorstyle = {
    color: "red"
  };
  const none = {
    color: "green"
  };
  const bgcstyle = {
    backgroundColor: "red"
  };
  const bgnone = {
    backgroundColor: "orange"
  };

  return (
    <>
      <header className='clickgame-font'>
        HOW FAST DO YOU CLICK ( More than 40+ !!! )
        <br />
        <br /> iN 10 SECOND
      </header>
      <h1 className="clickgame-h1 num">{number}</h1>
      <button
        style={timer < 6 ? bgcstyle : bgnone}
        className="clickgame-btn"
        onClick={() => setNumber(pre => pre + 1)}
        disabled={!gamestart}
      >
        {overbtn}
      </button>
      <br /> <br />
      <p className='clickgame-font'>YOUR SCORE : {gamestart ? 0 : number}</p>
      <br />
      <h2 className='clickgame-font' style={timer < 6 ? colorstyle : none}>TIMER {timer}</h2> <br /> <br />
      <button className="clickgame-btn" onClick={Gamestate} disabled={gamestart}>
        {startbtn}
      </button>
    </>
  );
}

export default MiniGame;