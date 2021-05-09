import {Member} from "../types/Member";
import axios from "axios";
import {MemberInp} from "../types/MemberInp";
import React from "react";
import {GlobalAction} from "../services/GlobalReducer";
import {FormAction} from "../forms/useForm";

const baseUrl = "http://localhost:8080/api/member";

export async function getAllMembers(): Promise<Member[]> {
    const cancelToken = axios.CancelToken.source();
    const res = await axios.get<Member[]>(baseUrl, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"

        }
    })
    return res.data
}

export async function createMember(memberInp: MemberInp,
                                   formDispatch: React.Dispatch<FormAction>): Promise<void> {
    try {
        formDispatch({type: "submit"});
        await axios.post<Member>(baseUrl, memberInp)
        formDispatch({type: "success"});
        formDispatch({type: "reset"})
    } catch (e) {
        formDispatch({type: "error", payload: e.response.data})
    }
}

export async function updateMember(memberInp: MemberInp,
                             formDispatch: React.Dispatch<FormAction>): Promise<void> {
    console.log("in Member api");
    try {
       formDispatch({type: "submit"});
        await axios.put<Member>(`${baseUrl}`, memberInp)
         formDispatch({type: "success"});
    } catch (e) {
        formDispatch({type: "error", payload: e.response.data})
    }
}

export async function getMemberById(idStr: string): Promise<Member> {
    const res = await axios.get<Member>(`${baseUrl}/${idStr}`)
        return res.data;
}

export async function deleteMember(idStr: string,
                                   globalDispatch: React.Dispatch<GlobalAction>): Promise<void> {
    try {
        globalDispatch({type: "loading", payload: true})
        await axios.delete<void>(`${baseUrl}/${idStr}`)
        globalDispatch({type: "loading", payload: false})
        globalDispatch({type: "delete", payload: idStr})
    } catch (e) {
        globalDispatch({type: "error", payload: e.response.data})
    }
}
