
import './game.css';
interface BallProps {
    position: {
        x: number;
        y: number;
        dx: number;
        dy: number;
    }
}

const Ball = ({ position }: BallProps) => {
    return <div className="ball" style={{ position: 'absolute', left: position.x, top: position.y }} />;
};

export default Ball;