import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CategoryListView from './CategoryList/CategoryListView';
import CategoryInfoView from './CategoryInfo/CategoryInfoView';
import CategoryEditView from './CategoryEdit/CategoryEditView';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: any;
//     value: any;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Container>
//                     <Box p={3}>
//                         <Typography component="span">{children}</Typography>
//                     </Box>
//                 </Container>
//             )}
//         </div>
//     );
// }

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

export default function CategoryRouter() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        history.push("/category")
    };

    function findTab() {
        let url = history.location.pathname.split('/');
        // console.log(url)
        // console.log(history.location.pathname)
        // console.log(history.location.pathname.length);
        let info = url[3];
        let id = url[2]

        if (info) {
            return 1
        }

        if (!info && id) {
            return 2
        }
        // setValue(1)
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
            <Route exact path="/category" component={() => <CategoryListView value={0} />} />
            <Route exact path="/category/:category_id/info" component={() => <CategoryInfoView value={1} />} />
            <Route exact path="/category/:category_id" component={() => <CategoryEditView value={2} />} />
            {/* <Route path="/category" component={CategoryRouter} /> */}
            {/* <TabPanel value={value} index={0}>
                <CategoryListView />
            </TabPanel> */}
            {/* <TabPanel value={value} index={1}>
                <CategoryInfoView />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CategoryEditView />
            </TabPanel>  */}
        </Container>
    );
}