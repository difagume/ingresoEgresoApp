import { acciones, SET_USER, CLEAR_USER } from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: acciones): AuthState {

    switch (action.type) {
        case SET_USER:
            return {
                user: { ...action.user }
            };

        case CLEAR_USER:
            return {
                user: null
            };

        default:
            return state;
    }
}
