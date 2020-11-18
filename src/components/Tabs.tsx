import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CategoryListView from '../Views/Category/CategoryList/CategoryListView';
// import CategoryInfoView from '../Views/Category/CategoryInfo/CategoryInfoView';
// import CategoryEditView from '../Views/Category/CategoryEdit/CategoryEditView';
import Container from '@material-ui/core/Container';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
                    <Box p={3}>
                        <Typography component="span">{children}</Typography>
                    </Box>
                </Container>
            )}
        </div>
    );
}

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

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        // <div className={classes.root}>
        <Container className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={"List"} {...a11yProps(0)} />
                    <Tab label="Info" {...a11yProps(1)} />
                    <Tab label="Edit" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CategoryListView />
            </TabPanel>
        </Container>
        /*  <TabPanel value={value} index={1}>
            <CategoryInfoView />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <CategoryEditView />
        </TabPanel> */
        // </div>


    );
}