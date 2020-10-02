import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { PATH_PREFIX } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2)
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#212121'
  },
  des: {
    fontSize: '0.875rem',
    color: '#212121'
  },
  img: {
    width: 120 * 2.6,
    height: 90 * 2.6,
  }
}));

export default ({ className }: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Box mt={3}>
        <img src={`${PATH_PREFIX}/static/product/product.jpg`} className={classes.img} />
      </Box>
      <Box mt={1}>
        <Typography className={classes.title}>
          产品特色
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          1.顶级企业级硬盘，Intel Optane SSD(DCP4800X多级缓存固态硬盘)。
        </Typography>
        <Typography className={classes.des}>
          2.搭配AMD Infinity架构，NVIDIA GeForce系列显卡，部署于T4级机房(n+1式冗余部署，7×24小时专业运维)。
        </Typography>
        <Typography className={classes.des}>
          3.KeyPool定制加速硬件，软硬件协同设计，急速提升时空证明速度。
        </Typography>
        <Typography className={classes.des}>
          4.采用基于Linux深度定制的MarlinOS智能挖矿管理系统。提升3倍资源利用率，节省50%成本；无限存储扩展，算力无上限；HotStandby，秒级故障恢复。
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography className={classes.title}>
          云存储空间收益
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          1.本产品将参与Filecoin官方测试网奖励计划，用户完成下单并支付成功，相关云存储空间将进入KeyPool代理并由其合理分配参与官方测试网奖励计划算力竞争。所获奖励将依据所产生实际有效存储空间公平分配。
        </Typography>
        <Typography className={classes.des}>
          2.本产品根据KeyPool的每T实际收益进行分配。用户完成下单并支付成功后，将在Filecoin主网上线，KeyPool产生收益之日起，开始计算云存储空间产生的收益。
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography className={classes.title}>
          收益结算/技术服务费
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          1.本产品将根据接入KeyPool后产生的实际收益进行分配。
        </Typography>
        <Typography className={classes.des}>
          2.本产品所产生的收益将以Filecoin的形式发放。
        </Typography>
        <Typography className={classes.des}>
          3.收益结算将在每个挖矿日结束1天内完成，用户收益将在扣除技术服务费后分配到用户的
          KeyPool账户。
        </Typography>
        <Typography className={classes.des}>
          4.本产品将收取每日挖矿总收益的25%作为技术服务费。
        </Typography>
        <Typography className={classes.des}>
          5.技术服务费包括服务期限内的托管费、带宽费、电费、以及运维和矿池系统使用费等费用。
        </Typography>
        <Typography className={classes.des}>
          6.收益结算公式:用户每天到账挖矿收益=用户持有的云存储空间T数×KeyPool每T每天产币量×(1-技术服务费25%-抵押比例)。
        </Typography>
        <Typography className={classes.des}>
          7.由于抵押比例还未完全确定，本产品有效期内实际到账将依据官方产币规则扣除相应抵押币。
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography className={classes.title}>
          合约终止
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          1.本技术服务有效期自Filecoin主网上线产生收益之日起开始计算，有效期36个月(3年)，到期自动解除，后期可续签合约或重新购买。
        </Typography>
        <Typography className={classes.des}>
          2.由于法律法规、政府政策、战争、地震、火灾和电力故障等不可抗原因导致IDC无法继续运营时，合约提前终止，KeyPool不承担赔偿责任。
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography className={classes.title}>
          风险提示
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'1.Filecoin会发生价格波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可' +
            '能导致云存储空间产生的收益变动。无论从数字货币还是法币角度，本合约不作收益承诺。用' +
            '户须仔细评估自己的风险承受能力，在可接受的风控范围内投资云存储空间。KeyPool对本合' +
            '同条款保留所有解释权。'}
        </Typography>
        <Typography className={classes.des}>
          2.用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致收益FIL即Filecoin挖矿行为被叫停、或者禁止的，本合约自动终止，由此造成的各方损失须自行承担。
        </Typography>
      </Box>
    </div>
  );
}
