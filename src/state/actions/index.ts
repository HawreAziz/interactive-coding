import { ActionTypes } from '../action-types';
import { CellType } from './cell'

export type CellDirection = 'up' | 'down';

export interface MoveCellAction {
    type: ActionTypes.MOVE_CELL;
    payload: {
        id: string;
        direction: CellDirection;
    }
}

export interface UpdateCellAction {
    type: ActionTypes.UPDATE_CELL,
    payload: {
        id: string;
        content: string;
    }
}

export interface InserCellAfterAction {
    type: ActionTypes.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellType;
    }
}

export interface DeleteCellAction {
    type: ActionTypes.DELETE_CELL;
    payload: {
        id: string
    };
}

export type Actions =
    | MoveCellAction
    | UpdateCellAction
    | DeleteCellAction
    | InserCellAfterAction;