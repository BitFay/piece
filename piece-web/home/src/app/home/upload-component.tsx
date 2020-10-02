import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import LinearProgress from '@material-ui/core/LinearProgress';
import {upload} from './upload';
import type from './type';
import {PATH_PREFIX} from '@/env';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    width: 30,
  },
  bold: {
    fontWeight: 'bold'
  }
}));

export default ({index, file, onRefresh, onComplete}: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState({loaded: '--', total: '--', complete: 0, speed: '--kb/s'});

  React.useEffect(() => {
    upload({
      file,
      callback: (loaded: number, total: number, complete: number, speed: string) => {
        console.log('loaded', loaded);
        console.log('total', total);
        console.log('complete', complete);
        console.log('speed', speed);
        let _loaded = loaded + ' Bytes';
        if(loaded > 1000){
          _loaded = (loaded/1000).toFixed(2)+' KB';
        }
        if(loaded/1000 > 1000){
          _loaded = (loaded/1000/1000).toFixed(2)+' MB';
        }
        if(loaded/1000/1000 > 1000){
          _loaded = (loaded/1000/1000/1000).toFixed(2)+' G';
        }
        let _total = total + ' Bytes';
        if(total > 1000){
          _total = (total/1000).toFixed(2)+' KB';
        }
        if(loaded/1000 > 1000){
          _total = (total/1000/1000).toFixed(2)+' MB';
        }
        if(loaded/1000/1000 > 1000){
          _total = (total/1000/1000/1000).toFixed(2)+' G';
        }
        setState({loaded: _loaded, total: _total, complete, speed});
      },
      onloadstart: () => {

      },
      ontimeout: () => {

      },
      onloadend: () => {
        setTimeout(() => {
          onComplete(index);
        }, 2000);
        onRefresh();
      }
    })
  }, []);

  const arr = file.name.split('.');
  const suffix = arr[arr.length-1];
  const img = PATH_PREFIX+'/static/file/'+(type[suffix.toLocaleUpperCase()]||type['default'])+'.png';
  return (
    <Box className={classes.root} mt={2} mb={2}>
      <Box className={classes.left} mt={2} mb={2}>
        <Box display={'flex'} alignItems={'center'} mt={1}>
          <img src={img} className={classes.img}/>
        </Box>
        <Box ml={2} width={400}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box mr={2}>
              <Typography className={classes.bold}>{file.name}</Typography>
            </Box>
            {/* {
              state.complete === 100 ?
              <Typography variant={"inherit"}>upload complete</Typography>
              :
              <Typography variant={"inherit"}>uploading {state.loaded} / {state.total}（{state.speed}）</Typography>
            } */}
            
            <Typography variant={"inherit"}>uploading {state.loaded} / {state.total}（{state.speed}）</Typography>
          </Box>
          <Box mt={1}>
            <LinearProgress variant="determinate" value={state.complete} />
          </Box>
        </Box>
        
      </Box>
      <Box mt={1} ml={2}>
        {
          state.complete === 100 ? 
          <CheckCircleIcon style={{ color: green[500] }}/>
          :
          <PauseCircleFilledIcon color="action"/>
        }
      </Box>
    </Box>
  )
}