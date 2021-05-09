import React, {useContext, useEffect, useReducer} from 'react';
import {FormReducer} from "../forms/useForm";
import {memberInitialState} from "../forms/MemberFormInfo";
import {useParams} from 'react-router-dom'
import MemberForm from "../components/MemberForm";
import {GlobalContext} from "../App";
import {getMemberById} from "../api/MemberApi";

interface ParamTypes {
    id: string
}
const Edit: React.FC = () => {
    const [state, dispatch] =
        useReducer(FormReducer, {...memberInitialState, variant: "Edit"});
    const { globalDispatch} = useContext(GlobalContext);

    let {id}  = useParams<ParamTypes>()

    useEffect(() => {
        globalDispatch({type:"loading", payload: true})
        globalDispatch({type: "error", payload: {}})

        getMemberById(id)
            .then(member => {
                globalDispatch({type:"loading", payload: false})
                dispatch({type: "initialize", payload: member});
            }).catch(e => {
            globalDispatch({type: "loading", payload: false})
            globalDispatch({type: "error", payload: e.response.data})
        })
    }, [id])

    return (
        <MemberForm state={state} dispatch={dispatch}/>
    );
};

export default Edit;
