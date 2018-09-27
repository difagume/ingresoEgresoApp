import { ActionReducerMap } from '@ngrx/store';
import { State, uiReducer } from './shared/ui.reducer';

export interface AppState {
    ui: State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer
};
