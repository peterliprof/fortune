import React, { Component, CSSProperties } from "react";
import { Position, Direction } from "../../helpers/types";

import Face from './Face'
import { actorDimension } from '../../helpers/constants'

interface ActorProps {
    position: Position
    handleKeyDown: (direction: Direction) => void
}


class Actor extends Component<ActorProps, {}>{

    constructor(props: ActorProps) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    handleKeyDown = (e: KeyboardEvent): void => {

        let direction = Direction.None;

        switch (e.key.valueOf()) {
            case 'ArrowLeft':
                direction = Direction.Left;
                break;
            case 'ArrowRight':
                direction = Direction.Right;
                break;
            case 'ArrowUp':
                direction = Direction.Up;
                break;
            case 'ArrowDown':
                direction = Direction.Down;
                break;
            default:
                return;
        }

        return this.props.handleKeyDown(direction);
    }

    style() {

        return {
            position: 'absolute',
            top: this.props.position.top,
            left: this.props.position.left
        } as CSSProperties;
    }

    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }

    render() {

        return (
            <div style={this.style()} >
                <Face dimension={actorDimension} />
            </div>
        )
    }
}

export default Actor;