import {Member} from "../types/Member";
import {IError} from "../types/OutputTypes";

export interface BaseFormState1 {
    love: number
    loading: boolean;
    variant?: "Create" | "Edit";
    error: IError
}

// export interface IMemberState extends BaseFormState{
//     id?: string;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     birthYear: number;
//     birthMonth: number;
//     dayOfBirth: number;
// }
//
// export const memberInitialState: IMemberState = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     birthYear: 2000,
//     birthMonth: 5,
//     dayOfBirth: 1,
//     loading: false,
//     error: {}
// }
//
// export type MemberAction =
//     | { type: 'submit' | "success";}
//     | { type: "error"; payload: {error: IError, initialState: IMemberState} }
//     | {type: "initialize"; payload: Member}
//     | {type: "field"; fieldName: string; payload: string | number}
//
// export function MemberReducer(state: IMemberState, action: MemberAction): IMemberState {
//     switch (action.type) {
//         case "field":
//             return {
//                 ...state,
//                 [action.fieldName] : action.payload
//             }
//         case "submit":
//             return {
//                 ...state,
//                 error: {},
//                 loading: true
//             }
//         case "success":
//             return  {
//                 ...state,
//                 loading: false
//             }
//         case "error":
//             return {...action.payload.initialState, error: action.payload.error}
//         default:
//             return state;
//     }
// }

