import { PayloadAction } from '@reduxjs/toolkit';

import { Direction, Position, ActorState, TargetState, GameStatus } from '../../helpers/types';
import { GameState } from './canvasSlice';

import { numberOfTargets, actorDimension, dimension, createTargetInterval, coinVal, coinBrokenVal, targetDimension } from '../../helpers/constants';

import { inTopEdge, inBottomEdge, inLeftEdge, inRightEdge, getRandomDirection, getRandomStartPosition, detectCollision, getRandomInt } from '../../helpers/util';



export const targetsMove = (state: GameState): GameState => {


    if (gameOver(state)) {
        return { ...state, status: GameStatus.Over };
    }

    let newState = createTarget(state);


    const targetsNotCatched = newState.targets.filter(target => {

        if (detectCollision(newState.actor, target)) {

            let scores = newState.score;
            scores += coinVal;
            newState = {
                ...newState, lastTargetCreatedAt: (new Date()).getTime(), fortune: newState.fortune + 1, score: scores
            };

            return false;
        } else {
            return true;
        }

    });


    newState = { ...newState, targets: targetsNotCatched };


    const targetsNotGone = newState.targets.filter(target => {

        switch (target.direction) {
            case Direction.Down:
                {
                    let { top } = target.position;
                    if (top > (dimension + targetDimension)) {
                        newState = { ...newState, fortuneLost: newState.fortuneLost + 1, score: newState.score - coinBrokenVal };
                        return false;
                    } else {
                        return true;
                    }
                }
            case Direction.Up: {
                let { top } = target.position;
                if (top < (-(targetDimension))) {
                    newState = { ...newState, fortuneLost: newState.fortuneLost + 1, score: newState.score - coinBrokenVal };
                    return false;
                } else {
                    return true;
                }
            }
            case Direction.Left:
                {
                    let { left } = target.position;
                    if (left < (-(targetDimension))) {
                        newState = { ...newState, fortuneLost: newState.fortuneLost + 1, score: newState.score - coinBrokenVal };
                        return false;
                    } else {
                        return true;
                    }
                }
            case Direction.Right:
                {
                    let { left } = target.position;
                    if (left > (dimension + targetDimension)) {
                        newState = { ...newState, fortuneLost: newState.fortuneLost + 1, score: newState.score - coinBrokenVal };
                        return false;
                    } else {
                        return true;
                    }
                }
            default:
                return true;

        }


    });

    newState = { ...newState, targets: targetsNotGone };

    return { ...newState, targets: targetStep(targetsNotGone) };

}

const gameOver = (state: GameState): boolean => {

    let rs = false;
    if ((state.coinTotal < 1) && (state.targets.length < 1)) {
        rs = true;
    }
    return rs;
}

const targetStep = (targets: TargetState[]): TargetState[] => {


    const newTargets = targets.map((target: TargetState) => {


        switch (target.direction) {

            case Direction.Up:

                target = { ...target, position: { ...target.position, top: target.position.top - target.steps } };
                return target;

            case Direction.Down:
                target = { ...target, position: { ...target.position, top: target.position.top + target.steps } };
                return target;

            case Direction.Left:
                target = { ...target, position: { ...target.position, left: target.position.left - target.steps } };
                return target;

            case Direction.Right:

                target = {
                    ...target, position: { ...target.position, left: target.position.left + target.steps }
                };
                return target;

            default:
                return target;

        };

    }) as TargetState[];


    return newTargets;

}

const createTarget = (state: GameState): GameState => {

    const createTime: boolean = (new Date()).getTime() - state.lastTargetCreatedAt > createTargetInterval * (getRandomInt(3) + 1);


    if (state.targets.length < numberOfTargets && createTime && (state.coinTotal > 0)) {

        const targetDirection = getRandomDirection();
        const targetPosition: Position = getRandomStartPosition(targetDirection);

        const targetSteps: number = state.targetSteps;
        const key = (new Date()).getTime()

        const newTarget: TargetState = { position: targetPosition, direction: targetDirection, steps: targetSteps, id: key };

        return { ...state, targets: [...state.targets, newTarget], lastTargetCreatedAt: (new Date()).getTime(), coinTotal: state.coinTotal - 1 };

    } else {
        return state;
    }
}


const moveActor = (actor: ActorState, direction: Direction): ActorState => {

    switch (direction) {
        case Direction.Left:
            if (inLeftEdge(actor.position,)) {
                return { ...actor, position: { ...actor.position, left: actor.position.left - actor.steps } };
            } else {
                return actor;
            }

        case Direction.Right:

            if (inRightEdge(actor.position, actorDimension, dimension)) {
                return { ...actor, position: { ...actor.position, left: actor.position.left + actor.steps } };
            } else {
                return actor;
            }
        case Direction.Up:


            if (inTopEdge(actor.position)) {

                return { ...actor, position: { ...actor.position, top: actor.position.top - actor.steps } };
            } else {
                return actor;
            }
        case Direction.Down:
            if (inBottomEdge(actor.position, actorDimension, dimension)) {
                return { ...actor, position: { ...actor.position, top: actor.position.top + actor.steps } };
            } else {
                return actor;
            }

        default:
            return actor;
    }

}


export const actorKeyDown = (state: GameState, action: PayloadAction<Direction>) => {

    let actor = state.actor;

    return { ...state, actor: { ...actor, position: moveActor(actor, action.payload).position } };

}