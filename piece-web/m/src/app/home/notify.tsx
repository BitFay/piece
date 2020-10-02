import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@/components/theme';
import NoticeIcon from '@/components/icons/notice';
import Slide from "@material-ui/core/Slide";
import { interval } from 'rxjs';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FAFAFA',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    height: 20
  },
  content: {
    display: 'flex',
    position: 'relative',
    width: 600
  },
  title: {
    display: 'flex',
    width: 1350,
    fontSize: '0.75rem',
    color: theme.colors.deepGrey,
    right: 1
  },
  img: {
    color: theme.colors.deepGrey,
    fontSize: '1.1rem',
    marginRight: theme.spacing(1),
    width: 50,
    backgroundColor: '#fafafa',
    zIndex: 1
  },
  tranCon: {
    position: 'relative',
    marginLeft: -950,
  }
}));

export default () => {
  const classes = useStyles();
  const [change, setChange] = React.useState(false);
  React.useEffect(() => {
    const subscribe = interval(1000).subscribe((r: any) => setChange(r !==0 && Boolean(r%21 !== 0)));
    return () => {
      subscribe.unsubscribe();
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <NoticeIcon className={classes.img} />
        {change ? 
        <Slide
          direction="left"
          in={true}
          onEnter={e => (e.style.transitionTimingFunction = "linear")}
          onEntering={e => (e.style.transitionTimingFunction = "linear")}
          onEntered={e => (e.style.transitionTimingFunction = "linear")}
          onExit={e => (e.style.transitionTimingFunction = "linear")}
          onExiting={e => (e.style.transitionTimingFunction = "linear")}
          onExited={e => (e.style.transitionTimingFunction = "linear")}
          timeout={20000}
        >
          <div className={classes.tranCon}>
            <Typography className={classes.title}>任何以我方名义宣传非我方设备、产品、技术服务的，可能涉及虚假宣传。请各位谨防诈骗，不要轻信他人，必要时可与我司核实。欢迎投诉举报，联系电话：400-820-3960。</Typography>
          </div>
        </Slide>
         : null} 
      </div>
    </div>
  )
};
