import React, {useContext, useEffect} from 'react';
import {GlobalContext} from "../App";
import {getAllMembers} from "../api/MemberApi";
import {Container} from "@material-ui/core";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import AllMemberTable from "../components/AllMemberTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 5
        }
    })
)


const Home = () => {
    const {globalState, globalDispatch} = useContext(GlobalContext);
    const {allMembers} = globalState

    const classes = useStyles();

    useEffect(() => {
        globalDispatch({type: "loading", payload: true})
        getAllMembers()
            .then(members => {
                globalDispatch({type: "updateAllMembers", payload: members})
                globalDispatch({type: "loading", payload: false})
            }).catch(e => {
            globalDispatch({type: "loading", payload: false})
            globalDispatch({type: "error", payload: e.response.data})
        })
    }, [])
    return (
        <Container component="main" maxWidth="md">
            {allMembers.length > 0 ? (
                <AllMemberTable members={allMembers} />
            ) : (<h2>No one in in db</h2>)}
        </Container>
    );
};

export default Home;
