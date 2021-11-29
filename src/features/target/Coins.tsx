import React from "react";

interface CoinsProps {
    dimension: number
}

const Coins: React.FunctionComponent<CoinsProps> = (props: CoinsProps) => {

    let dimension = props.dimension + 'px';

    return (

        <svg id="coin" x="0px" y="0px" viewBox="0 0 40 40" width={dimension} height={dimension}>
            <g>
                <ellipse stroke="#000000" cx="20" cy="10" rx="20" ry="10" fill="#E1B530" />
                <ellipse stroke="#000000" cx="20" cy="20" rx="20" ry="10" fill="#E1B530" />
                <ellipse stroke="#000000" cx="20" cy="30" rx="20" ry="10" fill="#E1B530" />
            </g>
        </svg>

    );

}

export default Coins;