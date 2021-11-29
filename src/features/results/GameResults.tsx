import { FunctionComponent, CSSProperties } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { restart, selectFortune, selectFortuneLost, selectScore } from "../canvas/canvasSlice";


import styles from '../../fortune.module.css';

import Champion from '../target/Champion';

import { dimension, coinTotalNum } from '../../helpers/constants';
import Coin from "../target/Coin";
import CoinBroken from "../target/CoinBroken";
import Coins from "../target/Coins";


interface GameResultsProps {
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

const GameResults: FunctionComponent<GameResultsProps> = (props: GameResultsProps) => {


    const dispatch = useAppDispatch();

    const fortune = useAppSelector(selectFortune);
    const fortuneLost = useAppSelector(selectFortuneLost);
    const scores = useAppSelector(selectScore);


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
                    <caption style={pannelCaptionlStyle(dimension)}><b>Fortune</b></caption>
                    <tbody>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Coins dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>{coinTotalNum}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Coin dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>{fortune}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><CoinBroken dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}>{fortuneLost}</td>
                        </tr>
                        <tr>
                            <td style={pannelLeftCellStyle(dimension)}><Champion dimension={dimension / 10} /></td>
                            <td style={pannelRightCellStyle(dimension)}><span style={{ color: "#E1B530" }}>{scores}</span></td>
                        </tr>


                    </tbody>
                </table>
                <div style={pannelStartStyle(dimension)} onClick={() => dispatch(restart())}>
                    <p className={styles.blinktext}>
                        <b>Restart</b>
                    </p>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default GameResults;