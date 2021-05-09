import React from 'react';
import {Member} from "../types/Member";
import {useHistory} from 'react-router-dom'
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {GlobalAction} from "../services/GlobalReducer";
import ConfirmDelete from "./ConfirmDelete";

interface Props {
    members: Member[],
}
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const AllMemberTable: React.FC<Props> = ({members}) => {
    const classes = useStyles();
    const history = useHistory();
    function handleEdit(id: string){
        history.push(`/edit/${id}`)
    }


    return (
       <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="members table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {`${row.firstName} ${row.lastName }`}

                                {/*{`${row.firstName ? row.firstName : ""} ${row.lastName ? row.lastName : ""}`}*/}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="primary" onClick={() => handleEdit(row.id as string)}>Edit</Button>
                                <ConfirmDelete  member={row}/>
                            </TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
       </TableContainer>
    );
};

export default AllMemberTable;
