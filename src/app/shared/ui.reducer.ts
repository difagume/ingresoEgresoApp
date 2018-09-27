import { acciones, ACTIVAR_LOADING, DESACTIVAR_LOADING } from './ui.actions';

export interface State {
    isLoading: boolean;
}

const estadoInicial: State = {
    isLoading: false
};

export function uiReducer(state = estadoInicial, action: acciones): State {

    switch (action.type) {
        case ACTIVAR_LOADING:
            return {
                isLoading: true
            };

        case DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}
