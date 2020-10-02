import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  content: {
    // width: 1200,
    padding: theme.spacing(2, 2, 0, 2)
  },
  title: {
    padding: theme.spacing(4, 0, 0, 0),
    fontWeight: "bold",
    fontSize: '1rem',
    color: '#212121'
  },
  des: {
    fontSize: '0.875rem',
    color: '#212121'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>关于KeyPool</Typography>
        <Box mt={2.5} mb={5}>
          <Typography className={classes.des}>
            KeyPool是Keystore旗下的基于Filecoin网络的技术服务平台，由资深区块链研发工程师，边缘计算及分布式存储专家倾力打造，创始团队来自Intel，分布式资本，奇虎360等企业，深耕行业多年，拥有丰富的加密资产管理，数据存储，企业SaaS服务经验。从17年Filecoin项目推出我们就保持高度关注，与ProtocolLabs社区有多年深入的技术创新交流，是Filecoin生态的重要成员。
          </Typography>
          <Typography className={classes.des}>
            目前，我们已与国内多家Tier4最高级别的IDC紧密合作，拥有稳定的托管资源。同时，KeyPool基于Filecoin进行了深入的算法优化，由内部研发团队自主设计研发的集群化架构方案，显著提升了挖矿性能及出块效率。
          </Typography>
        </Box>
      </div>
    </div>
  );
};
