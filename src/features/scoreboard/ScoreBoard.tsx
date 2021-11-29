import { FunctionComponent, CSSProperties } from "react";
import { dimension, targetDimension } from '../../helpers/constants';

import Coin from '../target/Coin'
import CoinBroken from '../target/CoinBroken'
import Champion from "../target/Champion";
import Coins from "../target/Coins";
import './scoreBoard.css'


interface ScoreBoardProps {
    fortune: number,
    fortuneLost: number,
    score: number,
    coinTotal: number
}

const ScoreBoard: FunctionComponent<ScoreBoardProps> = (props: ScoreBoardProps) => {

    const boardStyle = (dimension: number) => {

        const boardWidth = dimension + 'px';
        const boardHeight = dimension / 10 + 'px';

        return {
            width: boardWidth,
            height: boardHeight,
            border: '1px solid black',
            position: 'relative',
            margin: 'auto',
            overflow: 'hidden'
        } as CSSProperties;
    };


    const itemsStyle = () => {

        return {
            width: '70%',
            margin: 'auto',
        } as CSSProperties;
    };

    return (
        <div style={boardStyle(dimension)} >
            <div style={itemsStyle()}>
                <span className="space" />
                <span className="icon">
                    <Coins dimension={targetDimension} />
                </span>
                <span className="space" />
                <span className="text">{props.coinTotal}</span>
                <span className="space" />
                <span className="space" />
                <span className="icon">
                    <Coin dimension={targetDimension} />
                </span>
                <span className="space" />
                <span className="text">{props.fortune}</span>
                <span className="space" />
                <span className="space" />
                <span className="icon">
                    <CoinBroken dimension={targetDimension} />
                </span>
                <span className="space" />
                <span className="text">{props.fortuneLost}</span>
                <span className="space" />
                <span className="space" />
                <span className="icon">
                    <Champion dimension={targetDimension} />
                </span>
                <span className="space" />
                <span className="text" style={{ color: "#E1B530" }}>{props.score}</span>

            </div>
        </div>


    )
}

export default ScoreBoard;