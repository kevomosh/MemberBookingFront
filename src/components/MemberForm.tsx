import React  from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
    Button, MenuItem, Select,
    Grid, TextField, Container,
    InputLabel, Paper, Avatar, CircularProgress,
    InputAdornment, CssBaseline, Typography, FormControl
} from "@material-ui/core";
import {AccountCircle, MailOutline, Phone, AddCircleOutline, EditOutlined} from "@material-ui/icons";
import {createNumberArrayRange, selectFieldHandleOnChange, textFieldHandleOnChange} from "../utils/Functions";
import {IMemberState} from "../forms/MemberFormInfo";
import {FormAction} from "../forms/useForm";
import {createMember, updateMember} from "../api/MemberApi";
import {useHistory} from 'react-router-dom'
import {green} from "@material-ui/core/colors";


interface Props {
    state: IMemberState,
    dispatch: React.Dispatch<FormAction>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: "30px 20px"
        },
        avatarCreate: {
            margin: theme.spacing(1),
            backgroundColor: "#1bbd7e"
        },
        avatarEdit: {
            margin: theme.spacing(1),
            backgroundColor: "#DDA0DD"
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(3, 0, 2)
        },
        selectField: {
            width: 100,
            [theme.breakpoints.only('xs')]: {
                width: 75,
            },
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    })
)

const MemberForm: React.FC<Props> = ({state, dispatch}) => {
    const history = useHistory();
    const styles = useStyles();
    const {
        firstName, lastName, phoneNumber, variant,
        email, birthYear, birthMonth, dayOfBirth,
        loading, error
    } = state;

    const textFieldArr = [
        {name: "firstName", field: firstName, label: "First Name", icon: AccountCircle},
        {name: "lastName", field: lastName, label: "Last Name", icon: AccountCircle},
        {name: "email", field: email, label: "Email", icon: MailOutline},
        {name: "phoneNumber", field: phoneNumber, label: "Phone Number", icon: Phone},
    ]

    const selectArr = [
        {name: "dayOfBirth", field: dayOfBirth, label: "Day", items: createNumberArrayRange(1, 31)},
        {name: "birthMonth", field: birthMonth, label: "Month", items: createNumberArrayRange(1, 12)},
        {name: "birthYear", field: birthYear, label: "Year", items: createNumberArrayRange(1930, 2010)}
    ]

    async function onSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const {error, loading, variant, ...memberInp} = state;

        console.log("variant ", variant);


        if (variant === "Create") {
            await createMember(memberInp, dispatch)
        } else {
            await updateMember(memberInp, dispatch)
        }

        if(Object.keys(error).length === 0) {
            history.push("/")
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Paper className={styles.root} elevation={4}>
                {variant === "Create" ? (
                    <Avatar className={styles.avatarCreate}>
                        <AddCircleOutline/>
                    </Avatar>
                ) : (
                    <Avatar className={styles.avatarEdit}>
                        <EditOutlined/>
                    </Avatar>
                )}

                <Typography component="h1" variant="h5">
                    {`${variant} Member`}
                </Typography>
                <form
                    className={styles.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={e => onSubmit(e)}>

                    {textFieldArr.map(textField =>
                        <TextField
                            key={textField.name}
                            name={textField.name}
                            variant="outlined"
                            margin="normal"
                            autoFocus
                            fullWidth
                            id={textField.name}
                            label={textField.label}
                            value={textField.field}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {<textField.icon/>}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) =>
                                textFieldHandleOnChange(e, dispatch)
                            }
                        />
                    )}

                    <Typography align="center" component="p" variant="subtitle2">
                        Date of Birth
                    </Typography>

                    <Grid
                        container
                        spacing={1}
                    >
                        {selectArr.map(selectField =>
                            <Grid xs={4} item key={selectField.name}>
                                <FormControl className={styles.selectField}>
                                    <InputLabel id={selectField.name}>{selectField.label}</InputLabel>
                                    <Select
                                        name={selectField.name}
                                        fullWidth
                                        id={selectField.name}
                                        value={selectField.field}
                                        onChange={(e) =>
                                            selectFieldHandleOnChange(e, dispatch)
                                        }
                                    >
                                        {selectField.items.map((item: number) =>
                                            <MenuItem value={item} key={item}>{item}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                    >
                        {variant}
                    </Button>

                </form>
            </Paper>
        </Container>
    );
};

export default MemberForm;
