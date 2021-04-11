import { combineReducers } from 'redux';
import cellReducer, { CellState } from './cellReducer';
import bundleReducer, { BundleState } from './bundleReducer';


export interface CombineReducerState {
  cellData: CellState;
  bundles: BundleState
}

const reducers = combineReducers<CombineReducerState>({
  cellData: cellReducer,
  bundles: bundleReducer
});


export type RootState = ReturnType<typeof reducers>;
export default reducers;
