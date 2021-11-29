import React, { FunctionComponent, CSSProperties } from "react";

interface CanvasProps {
    dimension: number,
    children: React.ReactNode
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

const Canvas: FunctionComponent<CanvasProps> = (props: CanvasProps) => {
    return (
        <div style={style(props.dimension)}>
            {props.children}
        </div>
    );
}

export default Canvas;