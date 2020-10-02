import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useRouter } from 'next/router';
import NewsList from '../mock/news';
import GuideList from '../mock/guide';

const useStyles = makeStyles(() => ({
  root: {

  },
}));
const data: any = {
  'news': {
    '0': '2020-6-21',
    '1': '2020-5-29',
    '2': '2020-4-17',
    '3': '2020-1-15',
    '4': '2020-1-10',
  },
  'guide': {
    '0': '2020-6-18',
    '1': '2020-5-21',
    '2': '2020-4-15',
    '3': '2020-1-11',
    '4': '2020-1-09',
  }
}

export default () => {
  const classes = useStyles();
  const router = useRouter();
  const { query: { path = 'news', idx = '0' } } = router;
  const news: any[] = NewsList;
  const guides: any[] = GuideList;
  //@ts-ignore
  const html: any = path === 'news' ? news[idx] : guides[idx];
  //@ts-ignore
  const time = path === 'news' ? '时间：' + data[path][idx] : '';
  return (
    <Box pt={2.5} pb={2.5} pl={2} pr={2} className={classes.root}>
      <Typography variant={"h5"}>{html.title}</Typography>
      <Box mt={1}>
        <Typography color={"textSecondary"}>作者：KeyPool运营团队 {time}</Typography>
      </Box>
      <Box mt={5}>
        <div dangerouslySetInnerHTML={{ __html: html.content }} ></div>
      </Box>
    </Box>
  )
}