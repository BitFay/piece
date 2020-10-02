import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {PATH_PREFIX, BASE_URL} from '@/env';
import clsx from 'clsx';
import {getUser} from '@fay-react/lib/user';
import Menu from './menu';
import type from './type';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  img: {
    width: 80,
    margin: theme.spacing(0.5)
  },
  btn: {
    textAlign: 'center'
  },
  downloadBtn: {
    borderRadius: '20px'
  },
  item: {
    display: 'inline-block',
    textAlign: 'center',
    margin: theme.spacing(2),
    width: 130,
  },
  actions: {
    width: '100%',
    height: 30
  }
}));

export default ({className, data}: any) => {
  const classes = useStyles();
  const [hover, setHover] = React.useState('');
  
  const handleDownload = async (name: string, cid: string) => {
    console.log('download');
    try {
      const fetchRes = await fetch(BASE_URL+'/files/'+cid, {
        method: 'GET',
        // body: {
        //   q: ''
        // },
        headers: {
          'Authorization': getUser().token
        }
      });
      const result = await fetchRes.blob();
      console.log(result);
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = URL.createObjectURL(result)
      link.download = name;
      document.body.appendChild(link)
      link.click()
      // 释放的 URL 对象以及移除 a 标签
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
      // if(!result.error){
      //   setData(result.data);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={clsx(classes.root, className)}>
      {
        data.map((item:any, index: number) => {
          const arr = item.filename.split('.');
          const suffix = arr[arr.length-1];
          const img = PATH_PREFIX+'/static/file/'+(type[suffix.toLocaleUpperCase()]||type['default'])+'.png';
          return (
            <Box key={index} className={classes.item} onMouseOver={() => setHover(item.cid)} onMouseLeave={() => setHover('')}>
              <Box>
                <img src={img} className={classes.img}/>
              </Box>
              <Box mt={1}>
                <Typography>{item.filename}</Typography>
              </Box>
              {
                <Box mt={1} className={classes.actions}>
                  {
                    hover===item.cid &&
                    <>
                      <Button size={"small"} className={classes.downloadBtn} disableElevation color={"primary"} variant={"contained"} onClick={() => handleDownload(item.filename, item.cid)}>Download</Button>
                      <Menu data={item} img={img}/>
                    </>
                  }
                </Box>
              }
            </Box>
          )
        })
      }
    </div>
  )
}