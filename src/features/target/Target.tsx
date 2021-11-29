import React, { CSSProperties } from "react";

import { Position } from "../../helpers/types";

import Coin from './Coin';
import { targetDimension } from '../../helpers/constants'

interface TargetProps {
    position: Position

}

const Target: React.FunctionComponent<TargetProps> = (props: TargetProps) => {

    //console.log('Target Element', 'position', props.position);

    const style = (props: TargetProps) => {
        return {
            position: 'absolute',
            top: props.position.top,
            left: props.position.left
        } as CSSProperties;
    }

    return (
        <div style={style(props)}>
            <Coin dimension={targetDimension} />
        </div>
    );
}


export default Target;