import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';


import { ActorState, TargetState, StepLevel, Direction, GameStatus } from '../../helpers/types';

import { leftInitActor, topInitActor, actorStepFactor, coinTotalNum } from '../../helpers/constants';

import { targetsMove, actorKeyDown } from './canvasAPI';


export interface GameState {
    fortune: number;
    fortuneLost: number;
    actor: ActorState;
    targets: Array<TargetState>;
    lastTargetCreatedAt: number;
    targetSteps: number;
    score: number;
    coinTotal: number;
    status: GameStatus;
};

const initialState: GameState = {
    fortune: 0,
    fortuneLost: 0,
    actor: { position: { left: leftInitActor, top: topInitActor }, steps: StepLevel.Mid * actorStepFactor },
    targets: [],
    lastTargetCreatedAt: new Date().getTime(),
    targetSteps: StepLevel.Low,
    score: 0,
    coinTotal: coinTotalNum,
    status: GameStatus.NotStarted

};

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,

    reducers: {
        moveTargets: (state) => {
            return targetsMove(state);
        },

        keyDown: (state, action: PayloadAction<Direction>) => {
            return actorKeyDown(state, action);
        },
        start: (state) => {
            return { ...state, status: GameStatus.Started };
        },
        restart: (state) => {
            const starteState: GameState = initialState;
            return { ...starteState, status: GameStatus.Started };

        }

    }


});

export const { moveTargets, keyDown, start, restart } = canvasSlice.actions;


export const selectActorPosition = (state: RootState) => state.canvas.actor.position;
export const selectTarges = (state: RootState) => state.canvas.targets;
export const selectFortune = (state: RootState) => state.canvas.fortune;
export const selectFortuneLost = (state: RootState) => state.canvas.fortuneLost;
export const selectScore = (state: RootState) => state.canvas.score;
export const selectCoinTotal = (state: RootState) => state.canvas.coinTotal;
export const selectStatus = (state: RootState) => state.canvas.status;

export default canvasSlice.reducer;