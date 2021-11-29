import { Position, Direction, ActorState, TargetState } from "./types";
import { dimension, targetDimension, edgeMargin, actorDimension } from "./constants";


export const printTargets = (targets: TargetState[]) => {
    if (targets.length && targets.length > 0) {

        targets.forEach(target => {
            console.log('util', 'target', target.position);
        });

    } else {
        console.log('util', 'printTargets', ' NO target');
    }
}


export const detectCollision = (actor: ActorState, target: TargetState) => {
    return (Math.abs(actor.position.left - target.position.left) < actorDimension) && (Math.abs(actor.position.top - target.position.top) < actorDimension);
}


export const inBoundary = (target: TargetState): boolean => {

    const { left, top } = target.position;
    return ((left >= 0) && (left <= dimension - targetDimension) && (top >= 0) && (top <= dimension - targetDimension));
}

export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
}

export const getRandomDirection = () => {

    let p = getRandomInt(4);

    switch (p) {

        case 0:
            return Direction.Up;
        case 1:
            return Direction.Down;
        case 2:
            return Direction.Left;
        case 3:
            return Direction.Right;
        default:
            return Direction.None;
    }

}

export const getRandomStartPosition = (direction: Direction): Position => {

    switch (direction) {
        case Direction.Down:
            return { ...{ left: getRandomInt(dimension - targetDimension), top: (-2) * targetDimension } } as Position;
        case Direction.Up:
            return { ...{ left: getRandomInt(dimension - targetDimension), top: dimension + 2 * targetDimension } } as Position;
        case Direction.Left:
            return { ...{ left: dimension + 2 * targetDimension, top: getRandomInt(dimension - targetDimension) } } as Position;
        case Direction.Right:
            return { ...{ left: (-2) * targetDimension, top: getRandomInt(dimension - targetDimension) } } as Position;
        default:
            return { ...{ left: 0, top: 0 } } as Position;
    }

}



export const inLeftEdge = (position: Position): boolean => {

    return (position.left > edgeMargin);
}

export const inTopEdge = (position: Position): boolean => {

    return position.top > edgeMargin;
}


export const inRightEdge = (position: Position, objectDimension: number, canvasDimmesion: number): boolean => {

    return (position.left + objectDimension + edgeMargin) < canvasDimmesion;
}

export const inBottomEdge = (position: Position, objectDimension: number, canvasDimmesin: number): boolean => {

    return (position.top + objectDimension + edgeMargin) < canvasDimmesin;
}
