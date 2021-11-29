


export interface Position {
    left: number;
    top: number;
}


export enum Direction {
    Up,
    Down,
    Left,
    Right,
    None

}


export enum StepLevel {
    Low = 1,
    Mid = 2,
    Hight = 3
}

export interface ActorState {
    position: Position;
    steps: number;
}

export interface TargetState {
    position: Position;
    direction: Direction;
    steps: number;
    id: number;
}

export enum GameStatus {
    NotStarted = 1,
    Started,
    Over,
}