import {
    SET_LOADING_STATE
} from '../../../constants/ActionTypes';

export function setLoaderState({ state, stateKey }) {
    return { type: SET_LOADING_STATE, state, stateKey };
}