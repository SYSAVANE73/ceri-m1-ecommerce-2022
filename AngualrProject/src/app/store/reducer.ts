import { state } from '@angular/animations';
import {ActionReducer, createReducer, MetaReducer, on, props, USER_RUNTIME_CHECKS} from '@ngrx/store';
import { changeUsername, disconnect, getUser, initAction } from './actions';

const initialState = {
    appName: 'Ngrx',
    user: {
        username: '',
        isAdmin: false
    },
    users: {
        id: 0,
        nom: '',
        prenom: '',
        isLoged: false
    }
};

function log(reducer: ActionReducer<any>): ActionReducer<any> {
    return(state, action) => {
        const currentState = reducer(state, action);

        console.groupCollapsed(action.type)
        console.log('Etat precedent', state);
        console.log('Action ', action);
        console.log('Etat suivant', currentState);
        console.groupEnd()
        return currentState;
    }
}

export const metaReducers: MetaReducer[] = [log];

export const rootReducer = createReducer(initialState,
    on(initAction, (state) => {
        return {
            ...state,
            user: {
                ...state.user,
                isAdmin:true
            }
        }
    }),
    on(changeUsername, (state, props) => {
        return {
            ...state,
            user: {
                ...state.user,
                username : props.username
            }
        };
    }),
    on(getUser, (state, props) => {
        return {
            ...state,
            users : props.user
        }
    }),
    on(disconnect, (state, props) => {
        return {
            ...state,
            users:{
                ...state.users,
                isLoged : props.isloged
            }
        }
    })
);

