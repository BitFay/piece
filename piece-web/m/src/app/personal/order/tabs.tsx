import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Services from './services';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {
        value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    width: '100%',
    height: 'calc(100% - 40px)',
    '& .MuiBox-root':{
      padding: theme.spacing(0)
    }
  },
  views: {
    height: 'calc(100% - 48px)',
    overflow: "auto"
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      >
        <Tab label="全部" {...a11yProps(0)} />
        <Tab label="待付款" {...a11yProps(1)} />
        <Tab label="已完成" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <div className={classes.views}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Services/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Services status={"UnPaid"}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Services status={"Paid"}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  </div>
  );
}
