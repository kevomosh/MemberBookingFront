import React from 'react';
import {BaseFormState, FormAction} from "../forms/useForm";
import {IMemberState} from "../forms/MemberFormInfo";


export function textFieldHandleOnChange(
    e: React.ChangeEvent<any>,
    dispatch: React.Dispatch<FormAction>
): void {
    dispatch({
        type: "field",
        fieldName: e.target.name,
        payload: e.currentTarget.value
    })
}

export function selectFieldHandleOnChange(
    e: React.ChangeEvent<any>,
    dispatch: React.Dispatch<FormAction>
): void {
    const {name, value} = e.target
    dispatch({
        type: "field",
        fieldName : name,
        payload: value as number
    })
}


export function createNumberArrayRange(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
}
