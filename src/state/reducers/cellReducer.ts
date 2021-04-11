import { Actions } from '../actions';
import { ActionTypes } from '../action-types';
import { Cell } from '../actions';
import produce from 'immer';


export interface CellState {
  loading: boolean;
  error: string | null;
  order: string[],
  data: {
    [key: string]: Cell;
  }
}

const INITIAL_STATE: CellState = { loading: false, error: null, order: [], data: {} };

const reducer = produce((state: CellState = INITIAL_STATE, action: Actions): CellState => {
  switch (action.type) {
    case ActionTypes.MOVE_CELL:
      const index = state.order.findIndex(id => id === action.payload.id);
      const targetIndex = action.payload.direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state
    case ActionTypes.UPDATE_CELL:
      state.data[action.payload.id].content = action.payload.content;
      return state;
    case ActionTypes.DELETE_CELL:
      state.order = state.order.filter(id => id !== action.payload.id);
      return state;
    case ActionTypes.INSERT_CELL_AFTER:
      const cell: Cell = { id: getId(), content: '', type: action.payload.type };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex(id => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return state;
    default:
      return state;
  }
});


const getId = (): string => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;
