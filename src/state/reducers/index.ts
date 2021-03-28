import { combineReducers } from 'redux';
import cellReducer, { CellState } from './cellReducer';


export interface CombineReducerState {
    cellData: CellState;
}

const reducers = combineReducers<CombineReducerState>({
    cellData: cellReducer,
});


export type RootState = ReturnType<typeof reducers>;

export { reducers }