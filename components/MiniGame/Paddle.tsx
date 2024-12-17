interface PaddleProps {
  position: {
    x: number;
    y: number;
  }
}

const Paddle = ({ position }: PaddleProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "10px",
        height: "100px",
        backgroundColor: "white",
        border: '1px solid black',
        borderRadius: '4px'
      }}
    />
  );
};

export default Paddle;