import Layout from '@/app/layout';
import React from "react";
import Contact from '@/app/help/contact';

export default () => {
  return (
    <Layout header back centerTxt='联系我们'>
      <Contact />
    </Layout>
  )
}