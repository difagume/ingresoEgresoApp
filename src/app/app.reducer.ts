import { ActionReducerMap } from '@ngrx/store';
import { State, uiReducer } from './shared/ui.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface AppState {
    ui: State;
    auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer
};
