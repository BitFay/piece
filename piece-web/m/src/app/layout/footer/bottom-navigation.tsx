import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import CloudCircleOutlinedIcon from '@material-ui/icons/CloudCircleOutlined';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import {PATH_PREFIX} from '@/env';
import { useRouter } from 'next/router';
import { Subject, interval } from 'rxjs';
import {throttle} from 'rxjs/operators';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const homePathname = PATH_PREFIX === '' ? '/' : PATH_PREFIX;
const data = [{
  label: "首页",
  icon: <HomeOutlinedIcon/>,
  focus: <HomeIcon/>,
  path: homePathname
},{
  label: "云存储",
  icon: <CloudCircleOutlinedIcon/>,
  focus: <CloudCircleIcon/>,
  path: PATH_PREFIX+'/ccp'
},{
  label: "帮助",
  icon: <ContactSupportOutlinedIcon/>,
  focus: <ContactSupportIcon/>,
  path: PATH_PREFIX+'/help'
},{
  label: "我的",
  icon: <AccountCircleOutlinedIcon/>,
  focus: <AccountCircleIcon/>,
  path: PATH_PREFIX+'/personal'
}]

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const router = useRouter();
  const index = data.findIndex((item) => item.path === router.pathname)
  const [value, setValue] = React.useState(index);
  const clickSubject = new Subject();
  React.useEffect(() => {
    clickSubject.pipe(throttle(_val => interval(300))).subscribe((newValue: any) => {
      setValue(newValue);
      router.push(data[newValue].path!).then(() => window.scrollTo(0, 0));
    })
  })

  const handleChange = (_event: any, newValue: number) => {
    clickSubject.next(newValue);
    // setValue(newValue);
    // router.push(data[newValue].path!);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      {
        data.map((item, index) => <BottomNavigationAction key={index} label={item.label} icon={value === index ? item.focus : item.icon} />)
      }
    </BottomNavigation>
  );
}
