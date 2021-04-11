import { BundleAction } from '../actions';
import { ActionTypes } from '../action-types';
import produce from 'immer';


export interface BundleState {
  [key: string]:
  | {
    code: string;
    error: string;
    loading: boolean;
  } | undefined;
}

const INITIAL_STATE: BundleState = {};

const reducer = produce(
  (state: BundleState = INITIAL_STATE, action: BundleAction): BundleState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          error: '',
        };
        return state;
      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
