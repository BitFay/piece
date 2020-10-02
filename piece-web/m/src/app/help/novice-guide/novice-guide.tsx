import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import {useRouter} from 'next/router';
import GuideList from '../mock/guide';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      alignItems: "flex-start"
    },
    right: {
      width: 73,
      marginTop: theme.spacing(1)
    },
    rightPrimary: {
      fontSize: '0.75rem',
      color: theme.palette.grey[500]
    }
  }),
);

// const data = [{
//   label: '“IPFS”是什么？',
// },{
//   label: '“IPFS”是如何对标HTTP的',
// },{
//   label: '“IPFS”的技术架构',
// }]

export default () => {
  const data: any[] = GuideList;
  const classes = useStyles();
  const router = useRouter();
  const basePath = router.pathname.replace('/novice-guide', '');
  return (
    <Box className={classes.root} pt={1.5} pl={2} pr={2} pb={1}>
      <List component="nav">
        {
          data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem button disableGutters className={classes.listItem} onClick={() => router.push({pathname: basePath + '/detail', query: {path: 'guide', idx: index}}).then(() => window.scrollTo(0, 0))}>
                  <ListItemText primary={(index+1) + '、' + item.title}/>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })
        }
      </List>
      {/* <Box textAlign="center">
        <Button color={"primary"} variant={"outlined"} size={"small"}>查看更多</Button>
      </Box> */}
    </Box>
  );
}
