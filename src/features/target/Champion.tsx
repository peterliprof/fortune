import React from "react";

interface ChampionProps {
    dimension: number
}

const Champion: React.FunctionComponent<ChampionProps> = (props: ChampionProps) => {

    let dimension = props.dimension + 'px';

    return (

        <svg id="coin" x="0px" y="0px" viewBox="0 0 40 40" width={dimension} height={dimension}>
            <g>
                <circle cx="20" cy="15" r="15" fill="#E1B530" />
                <rect width="8" height="8" x="16" y="12" fill="#ffffff" />

                <path fill="#E1B530" d="M 0 28 L40 28 L40 50  L 00 50  z" />
            </g>
        </svg>

    );

}

export default Champion;