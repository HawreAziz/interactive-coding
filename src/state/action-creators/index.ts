import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types';
import { CellDirection, BundleAction } from '../actions'
import { CellType } from '../actions/cell'
import bundle from '../../bundler';

import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InserCellAfterAction,
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

export const insertCellAfter = (id: string | null, type: CellType): InserCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  }
}

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<BundleAction>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
