import {BaseFormState} from "./useForm";
import {Member} from "../types/Member";

export interface IMemberState extends BaseFormState{
    idStr?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    birthYear: number;
    birthMonth: number;
    dayOfBirth: number;
}

export const memberInitialState: IMemberState = {
    formVariant: "Member",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    birthYear: 2000,
    birthMonth: 5,
    dayOfBirth: 1,
    loading: false,
    error: {}
}

export function resetMember(): IMemberState {
    return memberInitialState;
}

export function initializeMember(state: IMemberState, member: Member): IMemberState{
    const {formVariant, loading, error, variant} = state;
    const dob = member.date_of_birth;
    const dateArr = dob?.split("-") as string[];

    return {
        formVariant,
        loading,
        error,
        variant,
        idStr: member.id as string,
        email: member.email as string,
        firstName: member.firstName as string,
        lastName: member.lastName as string,
        phoneNumber: member.phoneNumber as string,
        birthYear : Number(dateArr[0]),
        birthMonth: Number(dateArr[1]),
        dayOfBirth: Number(dateArr[2])
    }
}

