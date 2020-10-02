import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import {useRouter} from 'next/router';
import NewsList from '../mock/news';

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
//   title: '全方位解读IPFS生态圈：未来，因IPFS…',
//   desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
//   time: '刚刚'
// },{
//   title: '全方位解读IPFS生态圈：未来，因IPFS…',
//   desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
//   time: '今天'
// },{
//   title: '全方位解读IPFS生态圈：未来，因IPFS…',
//   desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
//   time: '昨天'
// }]

export default function SimpleList() {
  const data: any[] = NewsList;
  const classes = useStyles();
  const router = useRouter();
  const basePath = router.pathname.replace('/news', '');
  return (
    <Box className={classes.root} pt={1.5} pl={2} pr={2} pb={1}>
      {/* <Typography>
        <Box fontWeight="fontWeightBold">资讯动态</Box>
      </Typography> */}
      <List component="nav">
        {
          data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem button disableGutters className={classes.listItem} onClick={() => router.push({pathname: basePath + '/detail', query: {path: 'news', idx: index}}).then(() => window.scrollTo(0, 0))}>
                  <ListItemText primary={item.title} secondary={item.des}/>
                  <ListItemText primary={""} secondary={item.time} secondaryTypographyProps={{align: "right", className: classes.rightPrimary}} className={classes.right}/>
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
