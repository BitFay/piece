import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Search from './search';
import Content from './content';
import Add from './add';
import {BASE_URL} from '@/env';
import {getUser} from '@fay-react/lib/user';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  const getData = async (q: string) => {
    try {
      const fetchRes = await fetch(BASE_URL+'/files?q='+q, {
        method: 'GET',
        headers: {
          'Authorization': getUser().token
        }
      });
      const result = await fetchRes.json();
      console.log(result);
      if(!result.error){
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getData('');
  }, []);

  const handleRefreshData = () => {
    getData('');
  }

  const handleSearch = (cid: string) => {
    getData(cid);
  }

  return (
    <div className={classes.root}>
      <Search onChange={handleSearch}/>
      <Content className={classes.content} data={data}/>
      <Add onRefresh={handleRefreshData}/>
    </div>
  )
}