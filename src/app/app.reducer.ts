import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { ingresoEgresoReducer, IngresoEgresoState } from './ingreso-egreso/ingreso-egreso.reducer';
import { State, uiReducer } from './shared/ui.reducer';

export interface AppState {
    ui: State;
    auth: AuthState;
    ingresoEgreso: IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
    ingresoEgreso: ingresoEgresoReducer
};
