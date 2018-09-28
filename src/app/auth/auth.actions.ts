import { Action } from '@ngrx/store';
import { User } from './user.model';

export const SET_USER = '[Auth] Set user';
export const CLEAR_USER = '[Auth] Clear user';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user: User) { }
}

export class ClearUserAction implements Action {
    readonly type = CLEAR_USER;
}

export type acciones = SetUserAction | ClearUserAction;
