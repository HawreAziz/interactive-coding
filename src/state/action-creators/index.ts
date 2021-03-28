import { ActionTypes } from '../action-types';
import { CellDirection } from '../actions'
import { CellType } from '../actions/cell'

import {
    MoveCellAction,
    UpdateCellAction,
    DeleteCellAction,
    InserCellAfterAction
} from '../actions';

export const moveCell = (id: string, direction: CellDirection): MoveCellAction => {
    return {
        type: ActionTypes.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionTypes.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionTypes.DELETE_CELL,
        payload: {
            id
        }
    }
}

export const insertCellAfter = (id: string, type: CellType): InserCellAfterAction => {
    return {
        type: ActionTypes.INSERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
}
