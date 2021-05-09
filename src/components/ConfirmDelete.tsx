import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Member} from "../types/Member";
import {GlobalContext} from "../App";
import {deleteMember} from "../api/MemberApi";

interface Props {
    member: Member
}

const ConfirmDelete: React.FC<Props> = ({member}) => {
    const [open, setOpen] = React.useState(false);
    const {globalState, globalDispatch} = useContext(GlobalContext);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deleteThisMember() {
        await deleteMember(member.id as string, globalDispatch)
        handleClose()
    }
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to delete ${member.firstName} ${member.lastName}???`}</DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => deleteThisMember()} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDelete;
