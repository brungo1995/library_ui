import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuthorListView from './AuthorList/AuthorListView';
import AuthorInfoView from './AuthorInfo/AuthorInfoView';
import AuthorEditView from './AuthorEdit/AuthorEditView';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AuthorRouter() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        history.push("/author")
    };

    function findTab() {
        let url = history.location.pathname.split('/');
        let info = url[3];
        let id = url[2]

        if (info) {
            return 1
        }

        if (!info && id) {
            return 2
        }
        return 0
    }

    return (
        <Container className={classes.root}>
            <AppBar position="static">
                <Tabs value={findTab()} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={"List"} {...a11yProps(0)} />
                    <Tab label="Info" {...a11yProps(1)} disabled />
                    <Tab label="Edit" {...a11yProps(2)} disabled />
                </Tabs>
            </AppBar>
            <Route exact path="/author" component={() => <AuthorListView value={0} />} />
            <Route exact path="/author/:author_id/info" component={() => <AuthorInfoView value={1} />} />
            <Route exact path="/author/:author_id" component={() => <AuthorEditView value={2} />} />
        </Container>
    );
}