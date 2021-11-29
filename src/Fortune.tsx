import React from 'react';

import { connect } from 'react-redux'
import { RootState, AppDispatch } from './app/store';

import Canvas from './features/canvas/Canvas';

import Actor from './features/actor/Actor'
import ScoreBoard from './features/scoreboard/ScoreBoard';
import GamePannel from './features/gamePannel/GamePannel';
import GameResults from './features/results/GameResults';


import { dimension, targetInterval } from './helpers/constants';
import { Position, Direction, TargetState, GameStatus } from './helpers/types';

import { keyDown, moveTargets, selectActorPosition, selectFortune, selectFortuneLost, selectTarges, selectScore, selectCoinTotal, selectStatus } from './features/canvas/canvasSlice';
import Target from './features/target/Target';


interface FortuneProps {
    moveTargets: () => void,
    keyDown: (direction: Direction) => void,
    actorPosition: Position,
    targets: TargetState[],
    fortune: number,
    fortuneLost: number,
    score: number,
    coinTotal: number,
    status: GameStatus,

}

interface FortuneState {
    targetsTick: NodeJS.Timeout

}

class Fortune extends React.Component<FortuneProps, FortuneState> {


    constructor(props: FortuneProps) {
        super(props);

        this.handleTargetsMove = this.handleTargetsMove.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.startGame = this.startGame.bind(this);
    }


    private handleTargetsMove() {

        if (this.props.status === GameStatus.Started) {
            this.props.moveTargets();
        }
    }

    private handleKeyDown(direction: Direction) {

        this.props.keyDown(direction);

    }

    private startGame = () => {
        let targetsTick = setInterval(this.handleTargetsMove, targetInterval);
        this.setState({ targetsTick: targetsTick });
    }


    componentDidMount() {

        this.startGame();
    }

    componentWillUnmount() {

        clearInterval(this.state.targetsTick);
    }

    render() {

        const actorPosition = this.props.actorPosition;

        const targets = this.props.targets;


        return (
            <div className="App">
                <div>
                    {

                        (this.props.status === GameStatus.NotStarted) && <GamePannel dimension={dimension} />
                    }

                    {
                        (this.props.status === GameStatus.Started) && <Canvas dimension={dimension}>
                            <Actor position={actorPosition} handleKeyDown={this.handleKeyDown} />
                            {
                                targets.map((target: TargetState) => (
                                    <Target position={target.position} key={target.id} />
                                ))
                            }
                        </Canvas>
                    }

                    {
                        (this.props.status === GameStatus.Over) && <GameResults dimension={dimension} />
                    }

                </div>
                <div>
                    <ScoreBoard fortune={this.props.fortune} fortuneLost={this.props.fortuneLost} score={this.props.score} coinTotal={this.props.coinTotal} />
                </div>
            </div>

        );

    }
}


const mapStateToProps = (state: RootState) => {

    return {
        actorPosition: selectActorPosition(state),
        fortune: selectFortune(state),
        fortuneLost: selectFortuneLost(state),
        targets: selectTarges(state),
        score: selectScore(state),
        coinTotal: selectCoinTotal(state),
        status: selectStatus(state)
    };
};


const mapDispatchToProps = (dispatch: AppDispatch) => {

    return {
        moveTargets: () => {

            dispatch(moveTargets());

        },
        keyDown: (direction: Direction) => {

            dispatch(keyDown(direction));
        }
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Fortune);


