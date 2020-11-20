import React, { useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useHistory, useParams, useLocation } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { UserContext } from "../context_providers/user_provider";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);
const items = [
    { name: "Category", icon: CategoryIcon },
    { name: "Author", icon: AssignmentIndIcon },
    { name: "Book", icon: LibraryBooksIcon },
]
export default function PermanentDrawerLeft() {
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const location = useLocation();
    const { user, logOut } = useContext(UserContext)
    let entityPathName = history.location.pathname.split('/')[1] || null;

    function goToTabByName(itemName) {
        let url = history.location.pathname.split('/');
        history.push(`/${itemName}`)
    }

    function onLogOut() {
        logOut(() => history.replace("/signin"))
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Grid container>
                    <Grid item sm={6}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Book Library System ({user.username})
        </Typography>
                        </Toolbar>
                    </Grid>
                    <Grid item sm={6} style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            // className={classes.button}
                            // startIcon={<AddIcon />}
                            onClick={() => onLogOut()}
                            style={{ marginRight: "10px" }}
                        >
                            Log out
                                </Button>
                    </Grid>
                </Grid>

            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    {items.map((item, index) => (
                        <ListItem button key={item.name}
                            selected={item.name.toLocaleLowerCase().includes(entityPathName)}
                            onClick={() => goToTabByName(item.name.toLocaleLowerCase())}
                        >
                            <ListItemIcon>{<item.icon />}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
