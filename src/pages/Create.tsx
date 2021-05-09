import React, {useEffect, useReducer} from 'react';
import MemberForm from "../components/MemberForm";
import {FormReducer} from "../forms/useForm";
import {memberInitialState} from "../forms/MemberFormInfo";

const Create: React.FC = () => {
    const [state, dispatch] =
        useReducer(FormReducer, {...memberInitialState, variant: "Create"});

    useEffect(() => {


    },[])

    return (
        <MemberForm state={state} dispatch={dispatch}/>
    );
};

export default Create;
