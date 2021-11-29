import { FunctionComponent, CSSProperties } from "react";
import { useAppDispatch } from '../../app/hooks';
import { start } from "../canvas/canvasSlice";


import styles from '../../fortune.module.css';

import Champion from '../target/Champion';

import { dimension, coinTotalNum, coinVal, coinBrokenVal } from '../../helpers/constants';
import Coin from "../target/Coin";
import CoinBroken from "../target/CoinBroken";
import Coins from "../target/Coins";
import Face from "../actor/Face";

import KeyboardArrows from "./arrows.png"


interface GamePannelProps {
    dimension: number,

}

const style = (dimension: number) => {
    const dim = dimension + 'px';
    return {
        width: dim,
        height: dim,
        border: '1px solid black',
        position: 'relative',
        margin: '0px auto',
        overflow: 'hidden'
    } as CSSProperties;
};

const GamePannel: FunctionComponent<GamePannelProps> = (props: GamePannelProps) => {


    const dispatch = useAppDispatch();

    const pannelCaptionlStyle = (dimension: number) => {


        return {
            color: '#E1B530',
            margin: '5%'

        } as CSSProperties;
    };


    const pannelLeftCellStyle = (dimension: number) => {

        const cellWidth = dimension / 5 + 'px';

        return {
            width: cellWidth,

        } as CSSProperties;
    };


    const pannelRightCellStyle = (dimension: number) => {

        const cellWidth = dimension / 5 + 'px';

        return {
            width: cellWidth,
            textAlign: 'right',

        } as CSSProperties;
    };

    const pannelActorlLeftCellStyle = (dimension: number) => {

        const cellWidth = dimension / 5 + 'px';
        const cellHeight = dimension / 4 + 'px';

        return {
            width: cellWidth,
            height: cellHeight,
        } as CSSProperties;
    };



    const pannelArrowsCellStyle = (dimension: number) => {

        const cellWidth = dimension / 5 + 'px';
        const cellHeight = dimension / 4 + 'px';

        return {
            width: cellWidth,
            height: cellHeight,
        } as CSSProperties;
    };

    const pannelStartStyle = (dimension: number) => {


        return {
            color: '#E1B530',
            textAlign: 'center',
        } as CSSProperties;
    };

    return (
        <div style={style(props.dimension)}>
            <div className={styles.center}>
                <table>
                    <caption style={pannelCaptionlStyle(dimension)}><b>Fortune Game</b></caption>
                    <tbody>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Coins dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>{coinTotalNum}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Coin dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>+{coinVal}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><CoinBroken dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>-{coinBrokenVal}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Champion dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)} ><span style={{ color: "#E1B530" }}>{coinTotalNum * coinVal}</span></td>
                        </tr>
                        <tr>
                            <td style={pannelActorlLeftCellStyle(dimension)}><Face dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}><img style={pannelArrowsCellStyle(dimension)} src={KeyboardArrows} alt="arrows" /></td>
                        </tr>

                    </tbody>
                </table>
                <div style={pannelStartStyle(dimension)} onClick={() => dispatch(start())}>
                    <p className={styles.blinktext}>
                        <b>Start</b>
                    </p>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default GamePannel;