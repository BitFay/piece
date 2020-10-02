import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "./card";
import Tabs from "./tabs";
import Footer from "./footer";
import {getJson} from "@fay-react/lib/fetch";
import {BASE_SERVICE_URL} from "@/env";
import {Product} from "@/app/product/index.d";
import Router from 'next/router';

const useStyles = makeStyles(() => ({
  root: {

  },
  tabs: {
    marginBottom: 56
  }
}));

export default () => {
  const classes = useStyles();
  const [product, setProduct] = React.useState<Product>();

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/detail/'+Router.query.id}).then((res) => {
      if(res.status === 0){
        setProduct(res.detail);
      }else{
        // error
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      {
        product &&
        <>
          <Card data={product}/>
          <Tabs className={classes.tabs}/>
          <Footer data={product}/>
        </>
      }
    </div>
  )
}