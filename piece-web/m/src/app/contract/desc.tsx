import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
  }
}));

export default ({ className }: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Box>
        <Typography className={classes.title}>
          合约概述
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          尊敬的用户:
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'KeyPool(以下简称“我们”)是基于Filecoin网络的技术服务平台。我们深耕分布式存储技术，通过' +
            'IDC集群及算法优化方案为用户提供专业、优质的Filecoin云存储服务。以下条款为我们的服务条款，通' +
            '过您在我们网站平台的操作，我们将共同受到服务条款的约束，通过服务条款建立法律上的权利义务关系。' +
            '请您先仔细阅读本服务条款内容，充分理解本协议及各条款。您使用平台服务、通过网络页面确认或以其' +
            '他方式接受本协议，即视为您已充分理解本协议所有条款，并同意与我们订立本协议。如果您对本协议内' +
            '容有任何疑问，请勿进行下一步操作。'}
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'根据《中华人民共和国合同法》等有关法律、法规的规定，经双方平等、自愿协商，特就客户向KeyPool' +
            '购买云存储空间及服务事宜，达成以下一致条款，以供双方共同遵照执行:'}
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography className={classes.title}>
          1.购买及委托管理服务
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          1.1云存储空间购买
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'KeyPool向用户提供本协议所附带订单内指定型号的Filecoin云存储器，用户将通过购买Filecoin云存' +
            '储空间来取得Filecoin云存储器在本协议期限内的使用权，并委托KeyPool对其进行管理，以便最大程' +
            '度提高算力收益，保障用户的权益。'}
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          1.2云存储器委托管理
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'1.2.1云存储器托管服务：KeyPool为购买Filecoin云存储空间的用户提供的托管服务内容包括主机场地' +
            '配套，电力配套，直联带宽、安全监控，云存储器的安装管理及维修排查。'}
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          1.2.2运营监控服务：由KeyPool专业运维团队提供7*24h实时运营监控服务，保障委托的Filecoin云存储器的平稳运行。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          1.2.3最大算力保障：KeyPool尽可能保证全年Filecoin云存储器服务可运行时间达到99.99%，最大程度保障用户在托管云存储器期间内的算力收益。
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          2.购买和委托管理的期限
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          2.1云存储空间购买及委托管理期限:
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'用户享有其购买的Filecoin云存储空间的所有权，用户购买的Filecoin云存储器的运行期限为36个月，' +
            '自云存储器上线运行之日（含当天）开始计算。Filecoin云存储器运行到期后，KeyPool不再提供' +
            'Filecoin云存储空间委托管理服务。'}
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          3.费用支付
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'用户需要向KeyPool支付的费用包括年度Filecoin云存储空间的购买费用及技术服务费。关于技术服务' +
            '费：对于用户购买KeyPoolFilecoin云存储空间所产生收益的25%（以Fil结算）将作为技术服务费由' +
            'KeyPool收取，KeyPool提供技术服务所需的资质，技术解决方案及运维服务。'}
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          4.双方权利和义务
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          为保障双方合法权益，在平等互利的基础上，经双方协商一致，双方就购买Filecoin云存储空间服务协议达成如下责任标准：
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          4.1本产品不同于一般的消费类电子产品，而是根据用户需求特殊定制的产品，投资需谨慎，一旦合同达成概不退款。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          4.2KeyPool Filecoin云存储器应在Filecoin主网正式上线后部署并按时支付Filecoin云存储空间收益至用户指定账户中。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'4.3用户如果在主机上安装软件，所需要的软件版权/许可/使用权由KeyPool帮助提供；非双方另有书面' +
            '约定，客户承认KeyPool向甲方提供的任何资料、软件、数据等的权利属于KeyPool，用户无权复制、' +
            '传播、转让、许可或提供他人使用这些资源，否则应承担相应的责任。'}
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'4.4用户和KeyPool均应严格履行本协议的各项约定，若有任何一方违约，守约方有权向违约方发送书面' +
            '通知，违约方应自收到书面通知后7个工作日内向守约方书面说明理由。若未在约定期限说明理由，' +
            '又未予以更正的，则守约方有权采取举报、诉讼或仲裁等救济措施，KeyPool则有权采取其他合法措' +
            '施以实现自力救济，但保留通过诉讼、仲裁方式维护自身权益的权利。'}
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          5.风险提示
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'5.1数字货币算力市场的收益受到多个不可预知因素的影响，例如对应数字货币市场总算力状况，某一时' +
            '段的数字货币挖矿分配方案、对应币值波动等，因而我们强烈建议每个用户都必须就购买Filecoin云' +
            '存储器带来的收益作出独立判断，并应在选择是否购买Filecoin云存储器时考虑风险和自身情况。' +
            'KeyPool并不对用户挖矿收益承担责任。'}
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          {'5.2用户了解并接受，如因不可抗力因素影响，如自然灾害（洪水、泥石流等）、政策影响（国家发布文' +
            '件等）、爆发规模地区停电事故等被迫减少或暂停供电等，导致Filecoin云存储空间服务暂停、或者' +
            '被禁止的，本合同自动终止，双方不得相互追究责任，由此造成的损失须自行承担，用户已支付的费' +
            '用概不退还。'}
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          6.协议变更、解除、终止和权利义务的转让
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          6.1协议变更：KeyPool保留根据市场的需要，不定期修改交易方式、托管时长等协议内容的权利。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          6.2协议解除与终止：用户在使用平台服务的过程中，如果有下列情形发生，我们可以单方面解除本协议:
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          6.2.1冒用他人名义、盗用他人账户使用平台服务的;
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.des}>
          6.2.2为非法目的使用平台服务的;
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.des}>
          6.2.3从事任何可能侵害平台系统、资料之行为;
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.des}>
          6.2.4违反任何法律法规、本协议约定的;
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.des}>
          6.2.5监管机构认为平台提供的服务不再符合相关监管规定的;
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.des}>
          {'6.2.6除上述原因外，我们可以根据风险及自身业务运营情况需要终止向用户提供某些服务，届时我们将' +
            '会视情况公告或告知。鉴于这属于正常商业决策行为，如因此导致用户无法使用平台服务或服务受到限制' +
            '的，用户需理解我们无须对此承担责任。'}
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          6.3权利义务的转让：我们可以基于平台服务的需要，变更或增加履约主体。用户如继续使用平台服务，视为同意变更后的/新增的主体或作为与用户履约的相对方。
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          7.争议的解决
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          {'本协议的订立、效力、解释、履行及争议的解决均适用中华人民共和国法律。在协议履行期间，凡由本协' +
            '议引起的或与本协议有关的一切争议、纠纷，当事人应首先协商解决。协商不成，各方一致同意提交海南' +
            '仲裁委员会进行仲裁。'}
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography className={classes.title}>
          8.其他
        </Typography>
      </Box>
      <Box mt={2.5}>
        <Typography className={classes.des}>
          8.1本协议的附件及各项补充、修订或变更，为本协议不可分割的组成部分，与本协议正文具有同等法律效力。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          8.2本协议各方应按法律法规及相关规定各自承担与本协议相关的税费。
        </Typography>
      </Box>
      <Box >
        <Typography className={classes.des}>
          8.3本协议未尽事宜，由双方协商处理，或者按国家有关法律、法规的规定执行。
        </Typography>
      </Box>
    </div>
  );
}
