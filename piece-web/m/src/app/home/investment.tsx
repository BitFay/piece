import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
// import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Theme } from '@/components/theme';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.common.black,
    background: `url('${PATH_PREFIX}/static/home/invest/bg.png') no-repeat center`,
    backgroundSize: 'cover',
    color: theme.palette.common.white,
  },
  // content: {
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
  title: {
    fontSize: '1.25rem',
    textAlign: "center",
    fontWeight: "bold"
  },
  list: {
    marginTop: theme.spacing(3)
  },
  listItem: {
    // padding: theme.spacing(4, 5),
  },
  listItemTextPrimary: {
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  listItemTextSecondary: {
    color: theme.palette.common.white,
  },
  listItemAvatar: {
    minWidth: '76px'
  },
  avatar: {
    width: 56,
    height: 56
  },
  listItemImg: {
    width: 384,
    height: 72,
    border: '1px solid #E0E0E0',
    padding: theme.spacing(1.25),
    textAlign: "center"
  },
  imgContent: {
    display: 'flex'
  },
  imgItem: {
    height: 'calc( 100vw * 0.16 )'
  },
}));

// const data = [{
//   id: 1,
//   name: "Bo Shen",
//   desc: "分布式资本、gf.network创始人，Bitshares联合创始人"
// },{
//   id: 2,
//   name: "孙铭",
//   desc: "世泽律师事务所合伙人、分布式资本、gf.network法律总顾问"
// },{
//   id: 3,
//   name: "Ye Yaming",
//   desc: "靖亚资本管理合伙人，携程网前首席技术官兼高级副总裁"
// }];

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        {/* <Box>
          <Typography className={classes.title}>投资人</Typography>
          <List className={classes.list}>
            {
              data.map((item) => {
                return (
                  <ListItem key={item.id} className={classes.listItem}>
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <Avatar className={classes.avatar} src={`${PATH_PREFIX}/static/home/invest/${item.id}.png`}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.desc}
                      primaryTypographyProps={{className: classes.listItemTextPrimary}}
                      secondaryTypographyProps={{className: classes.listItemTextSecondary}}
                    />
                  </ListItem>
                )
              })
            }
          </List>
        </Box> */}
        <Box >
          <Typography className={classes.title}>投资机构</Typography>
          <Box mt={3}>
            <Grid container spacing={3} className={classes.imgContent}>
              <Grid className={classes.listItem} xs={6} item>
                <Box pt={2} pb={2} pl={5} pr={5} border={'1px solid'} className={classes.imgItem}>
                  <img src={`${PATH_PREFIX}/static/home/invest/org/1.png`} width={'100%'} />
                </Box>
              </Grid>
              <Grid className={classes.listItem} xs={6} item>
                <Box pt={2.5} pb={2.5} pl={1} pr={1} border={'1px solid'} className={classes.imgItem}>
                  <img src={`${PATH_PREFIX}/static/home/invest/org/2.png`} width={'100%'}/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Box>
  )
}