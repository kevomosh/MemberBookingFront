import {IError} from "../types/OutputTypes";
import {Member} from "../types/Member";
import {IMemberState, initializeMember, resetMember} from "./MemberFormInfo";

export interface BaseFormState {
    formVariant: "Member",
    loading: boolean;
    variant?: "Create" | "Edit";
    error: IError
}

export type FormAction =
    | { type: 'submit' | "success" | "reset";}
    | { type: "error"; payload: {error: IError, initialState: IMemberState} }
    | {type: "initialize"; payload: Member}
    | {type: "field"; fieldName: string; payload: string | number}



export function FormReducer(state: IMemberState, action: FormAction): IMemberState {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName] : action.payload
            }
        case "submit":
            return {
                ...state,
                error: {},
                loading: true
            }
        case "success":
            return  {
                ...state,
                loading: false
            }
        case "error":
            return {...action.payload.initialState, error: action.payload.error}
        case "initialize":
            return initialize(state, action.payload)
        case "reset":
            return reset(state);
        default:
            return state;
    }
}

function initialize(state: IMemberState, dto: Member): IMemberState {
    switch (state.formVariant) {
        case "Member":
            return initializeMember(state, dto);
        default:
            return state;
    }
}

function reset(state: IMemberState): IMemberState {
    switch (state.formVariant) {
        case "Member":
            return resetMember();
        default:
            return state;
    }
}
