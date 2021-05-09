import {Member} from "../types/Member";
import {IError} from "../types/OutputTypes";

export interface IGlobalState {
    currentMember: Member,
    allMembers: Member[],
    loading: boolean,
    error: IError
}

export type GlobalAction =
    | {type: "updateAllMembers"; payload: Member[]}
    | {type: "delete"; payload: string}
    | {type: 'loading'; payload: boolean}
    | {type: "error"; payload: IError}

export function GlobalReducer(state: IGlobalState, action: GlobalAction): IGlobalState {
    switch (action.type) {
        case "updateAllMembers":
            return {...state, allMembers: action.payload}
        case "delete":
            const adjustedList = [...state.allMembers].filter(m => m.id !== action.payload)
            return {...state, allMembers: adjustedList}
        case "loading" :
            return {...state, loading: action.payload}
        case "error":
            return {...state, error: action.payload}
        default:
            return state;
    }
}
