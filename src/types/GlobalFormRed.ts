import {GlobalAction, IGlobalState} from "../services/GlobalReducer";
import React from "react";
import {FormAction} from "../forms/useForm";

export interface GlobalFormDispatch {
    globalDispatch: React.Dispatch<GlobalAction>
    formDispatch: React.Dispatch<FormAction>
}
