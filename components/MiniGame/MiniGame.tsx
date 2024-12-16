import React, { useState, useEffect, useRef, useCallback } from "react";
import "./game.css";

interface ResultsProps {
  shown: boolean;
  prize: number;
}

const Results: React.FC<ResultsProps> = ({ shown, prize }) => {
  const messages = ["3UP", "5UP", "2UP", "No Prize"];
  const classList = `results ${shown ? "shown" : ""}`;

  return <div className={classList}>{messages[prize]}</div>;
};

interface RowProps {
  name: string;
  index: number;
  data: { activeRowIndex: number };
  setRotatingValue: (index: number, value: number) => void;
  isRunning: boolean;
  speed: number;
  direction: "ltr" | "rtl";
}

const Row: React.FC<RowProps> = ({
  name,
  index,
  data,
  setRotatingValue,
  isRunning,
  speed,
  direction,
}) => {
  const [value, setValue] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isRunning) {
        if (direction === "ltr") {
          setValue((prevValue) => (prevValue < 2 ? prevValue + 1 : 0));
        } else {
          setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 2));
        }
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, direction, speed]);

  useEffect(() => {
    setRotatingValue(index, value);
  }, [value, index, setRotatingValue]);

  const activeRowIndex = data.activeRowIndex;
  const activeClass = index === activeRowIndex ? "active" : "";
  const columnsClassList = `columns columns-${name}`;
  const wrapperClassList = `row ${activeClass}`;
  const animation = `${direction}-transition-${value}`;
  const style = {
    animationName: animation,
    animationDuration: `${speed}ms`,
  };

  return (
    <div className={wrapperClassList}>
      <div className={columnsClassList} style={style}>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
  );
};

interface RowState {
  name: string;
  index: number;
  value: number;
  endValue: number;
  speed: number;
  isRunning: boolean;
  key: number;
  direction: "ltr" | "rtl";
}

interface MiniGameProps {
  stop: boolean;
  handleDisplay: (value: boolean) => void;
}

export const MiniGame: React.FC<MiniGameProps> = ({ stop, handleDisplay }) => {
  const [rows, setRows] = useState<RowState[]>([
    {
      name: "top",
      index: 0,
      value: 0,
      endValue: 0,
      speed: 200,
      isRunning: true,
      key: Math.random(),
      direction: "ltr",
    },
    {
      name: "center",
      index: 1,
      value: 0,
      endValue: 0,
      speed: 200,
      isRunning: true,
      key: Math.random(),
      direction: "rtl",
    },
    {
      name: "bottom",
      index: 2,
      value: 0,
      endValue: 0,
      speed: 200,
      isRunning: true,
      key: Math.random(),
      direction: "ltr",
    },
  ]);
  const [prize, setPrize] = useState<number>(3);
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);

  useEffect(() => {
    const handleClick = () => {
      if (activeRowIndex < rows.length) {
        cancelInterval(activeRowIndex);
        setEndValue(activeRowIndex, rows[activeRowIndex].value);
        determinePrize();
      }
      updateActiveRow();
    };

    document.body.addEventListener("touchstart", handleClick);
    window.addEventListener("keypress", handleClick);

    return () => {
      document.body.removeEventListener("touchstart", handleClick);
      window.removeEventListener("keypress", handleClick);
    };
  }, [activeRowIndex, rows]);

  useEffect(() => {
    if (activeRowIndex === 3) {
      handleDisplay(true);
    }
  }, [activeRowIndex, handleDisplay]);

  useEffect(() => {
    if (stop) {
      setRows((prevRows) =>
        prevRows.map((row) => ({ ...row, isRunning: false }))
      );
      handleDisplay(true);
    }
  }, [handleDisplay, stop]);

  const updateActiveRow = () => {
    if (activeRowIndex < rows.length) {
      console.log('update active row');
      setActiveRowIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log('reset game');
      resetGame();
    }
  };

  const determinePrize = () => {
    const endValues = rows.map((row) => row.endValue);
    let prizeValue = endValues[0];

    console.log('>>>>>>', rows, endValues);

    for (let i = 1; i < endValues.length; i++) {
      if (endValues[i] !== prizeValue) {
        prizeValue = 3; // Code for 'No Prize'
        break;
      }
    }

    setPrize(prizeValue);
  };

  const resetGame = () => {
    const newRows = rows.map((row) => ({
      ...row,
      key: Math.random(),
      isRunning: true,
      value: 0,
      endValue: 0,
    }));
    setRows(newRows);
    setActiveRowIndex(0);
  };

  const setRotatingValue = useCallback((index: number, value: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].value = value;
      return newRows;
    });
  }, []);

  const setEndValue = (index: number, value: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].endValue = value;
      return newRows;
    });
  };

  const cancelInterval = (index: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].isRunning = false;
      return newRows;
    });
  };

  return (
    <div className="game">
      <div className="rows">
        {rows.map((row) => (
          <Row
            key={row.key}
            name={row.name}
            index={row.index}
            data={{ activeRowIndex }}
            setRotatingValue={setRotatingValue}
            isRunning={row.isRunning}
            speed={row.speed}
            direction={row.direction}
          />
        ))}
      </div>
      <Results shown={activeRowIndex === 3} prize={prize} />
    </div>
  );
};