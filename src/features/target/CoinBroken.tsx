import React from "react";

interface CoinProps {
    dimension: number
}

const CoinBroken: React.FunctionComponent<CoinProps> = (props: CoinProps) => {

    let dimension = props.dimension + 'px';

    return (

        <svg id="coin" x="0px" y="0px" viewBox="0 0 40 40" width={dimension} height={dimension}>
            <g>
                <circle cx="20" cy="20" r="20" fill="#B0B0B0" />

                <rect width="10" height="10" x="15" y="15" fill="#ffffff" />

                <path fill="#ffffff" stroke="#FFFFFF" strokeWidth="10%" d="M 20 0 L20 40  z" />
            </g>
        </svg>

    );

}

export default CoinBroken;