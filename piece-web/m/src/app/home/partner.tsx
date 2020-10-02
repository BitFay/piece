import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme } from '@/components/theme';
import ViewGrow from '@/components/view-grow';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5, 2, 5, 2),
    textAlign: "center"
  },
  title1: {
    fontSize: '1.25rem',
    fontWeight: 600
  },
  img: {
    width: "100%",
    height: "100%",
  }
}));

const data = [{
  id: '1',
},{
  id: '2',
},{
  id: '3',
},{
  id: '4',
},{
  id: '5',
},{
  id: '6',
},{
  id: '8',
},{
  id: '9',
},{
  id: '10',
},{
  id: '11',
},{
  id: '12',
},{
  id: '13',
},{
  id: '14',
},{
  id: '15',
},{
  id: '16',
},{
  id: '17',
},{
  id: '18',
},{
  id: '19',
},{
  id: '20',
}];

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ViewGrow>
        <Box pb ={3}>
          <Typography className={classes.title1}>合作伙伴</Typography>
        </Box>
      </ViewGrow>
        <Grid container>
          {
            data.map((item, index) => {
              return (
                <ViewGrow key={index}>
                  <Grid xs={4} item>
                    <Box p={0.75}>
                      <img src={`${PATH_PREFIX}/static/home/partner/partner-${item.id}.png`} className={classes.img}/>
                    </Box>
                  </Grid>
                </ViewGrow> 
              )
            })
          }
        </Grid>
    </Box>
  )
}