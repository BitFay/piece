import React from "react";
import Layout from '@/app/layout';
import EmailSetting from '@/app/personal/setting/email';

export default () => {

  return (
    <Layout header back>
      <EmailSetting/>
    </Layout>
  )
}