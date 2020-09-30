import React from 'react';
import Layout from '../layout';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';
import {getUser} from '@fay-react/lib/user';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div style={{display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress/>
    </div>
  )
}

const notNeedLoginPaths = ['login', 'registry'];

export default ({children}: any) => {

  const router = useRouter();
  const user = getUser();
  const path = router.pathname.substr((PATH_PREFIX+'/').length, router.pathname.length-(PATH_PREFIX+'/').length);
  const needLogin = !user && !notNeedLoginPaths.includes(path);

  const [component, setComponent] = React.useState(<Loading/>);

  const root: any = {
    'login': <>{children}</>,
    'registry': <>{children}</>,
    'default': <Layout>{children}</Layout>,
  }

  React.useEffect(() => {
    if(needLogin){
      router.push(PATH_PREFIX+'/login');
    }else{
      setComponent(root[path] || root['default']);
    }
  }, [path]);

  return component;
}