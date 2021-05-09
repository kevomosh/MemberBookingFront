import React from 'react';
import { withRouter ,useHistory} from 'react-router-dom'
import {AppBar, Button, makeStyles, Toolbar,
    Typography, IconButton, MenuItem, Menu, useMediaQuery } from "@material-ui/core";
import {createStyles, Theme, useTheme} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: 10
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        mobile: {
            display: "none"

        }
    }),
);

const Header: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))



    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (url: string ) => {
        setAnchorEl(null);
        history.push(url)
    };

    const handleButtonClick = (url: string) => {
        history.push(url)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        DIPSE
                    </Typography>
                        <div >
                            {isMobile ? (
                                <>
                                    <IconButton edge="start"
                                                className={classes.menuButton}
                                                color="inherit"
                                                onClick={handleMenu}
                                                aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem onClick={() => handleMenuClick("/")}>Home</MenuItem>
                                        <MenuItem onClick={() => handleMenuClick("/create")}>Create</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <div>
                                <IconButton edge="start"
                                            onClick={() => handleButtonClick("/")}
                                            className={classes.menuButton}
                                            color="inherit"
                                            aria-label="menu">
                                   <Typography>
                                       Home
                                   </Typography>
                                </IconButton>
                                    <IconButton edge="start"
                                                onClick={() => handleButtonClick("/create")}
                                                className={classes.menuButton}
                                                color="inherit"
                                                aria-label="menu">
                                        <Typography>
                                            Create
                                        </Typography>
                                    </IconButton>
                                </div>
                            )}

                        </div>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Header);
