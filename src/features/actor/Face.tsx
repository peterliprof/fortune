import React from "react";


interface FaceProps {
        dimension: number
}

const Face: React.FunctionComponent<FaceProps> = (props: FaceProps) => {

        let dimension = props.dimension + 'px';

        return (

                <svg version="1.1" id="face" x="0px" y="0px" viewBox="0 0 40 40" width={dimension} height={dimension}>
                        <g>
                                <circle cx="20" cy="20" r="20" fill="#FFA733" />

                                <circle cx="15" cy="15" r="3" fill="#554431" />

                                <circle cx="25" cy="15" r="3" fill="#554431" />

                                <path d="M 10 25 q 10 10 20 0" stroke="#FF5023" stroke-width="3" fill="none" />

                        </g>

                </svg>
        );

}

export default Face;