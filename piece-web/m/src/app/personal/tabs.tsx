import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
// import ListAltIcon from '@material-ui/icons/ListAlt';
import ListAltIcon from '@/components/icons/capital';
import { Theme } from "@/components/theme";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(-4.5, 2, 0, 2),
    boxShadow: '0px 2px 4px -1px rgba(33,33,33,0.16),0px 1px 10px 0px rgba(33,33,33,0.08),0px 4px 5px 0px rgba(33,33,33,0.1)'
  },
  tabs: {
    display: 'flex'
  },
  piece: {
    display: 'flex',
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  tab: {
    width: '99%'
  },
  divi: {
    width: 1,
    height: 48,
    marginTop: 12
  }
}));

const data = [
  {
    label: '我的资产',
    icon: <ListAltIcon />,
    path: '/capital'
  },
  {
    label: '我的合约',
    icon: <ConfirmationNumberIcon />,
    path: '/contract'
  }
]

export default function IconLabelTabs() {
  const classes = useStyles();
  const router = useRouter();

  const handleChange = (newValue: any) => {
    router.push(router.pathname + data[newValue].path);
  };

  return (
    <Paper className={classes.root}>
      <div
        className={classes.tabs}
      >
        {
          data.map((item, index) =>
            <>
              <Box className={classes.piece} key={index}>
                <Tab key={index} icon={item.icon} label={item.label} className={classes.tab} onClick={() => handleChange(index)} />
              </Box>
              {index === 0 ? <Divider className={classes.divi} /> : null}
            </>
          )
        }
      </div>
    </Paper>
  );
}
