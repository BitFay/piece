import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import Desc from './desc';
import Prod from './prod';
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
    {value === index && (
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
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2)
  },
}));

export default ({className}: any) => {
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
    <div className={clsx(classes.root, className)}>
      <AppBar position="static" color="transparent" elevation={2}>
        <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        >
          <Tab label="产品说明" {...a11yProps(0)} />
          <Tab label="合约详情" {...a11yProps(1)} />
          {/* <Tab label="常见问题" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Prod />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Desc/>
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          常见问题
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}
