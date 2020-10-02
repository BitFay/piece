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
    width: 1200,
    marginBottom: theme.spacing(8)
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
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Box mt={3}>
          <Typography className={classes.des}>
            {'我们尊重用户和网站访问者（统称为“您”）的隐私，并承诺尽力保护您的在线隐私。本隐私政策描述了' +
              '海南墨灵网络科技有限公司及其关联实体（以下称为“KeyPool”“我”，“我们的”或“我们”）' +
              '管理、收集、维护和处理用户个人数据的流程。我们可能不时更新本隐私政策。我们会在此页面上发布新' +
              '的隐私政策来通知您任何变更。我们建议您定期查看此隐私政策来了解变更。本隐私政策的变更自其发布' +
              '在此网页之时生效。使用服务或本网站即表示您接受本政策的条款，并同意我们按照本政策的规定收集使' +
              '用披露或保留您的信息。'}
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.title}>
            1.我们可能收集的信息
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'我们可能会使用您的个人数据来提供和改进KeyPool向您提供的产品及服务（“服务”），并改善您在本' +
              '网站上的使用体验。“个人数据”是指与被识别或可识别的人有关的任何信息。当您为使用服务创建帐户' +
              '时，我们会收集您提供给我们的信息。我们还使用各种技术来收集和存储信息，包括Cookie、像素标签、' +
              '本地存储（如浏览器网络存储或应用程序数据缓存、数据库和服务器日志）。您使用服务或本网站，即表' +
              '示您同意我们按照本隐私政策收集和使用信息。除非本隐私政策另有规定，否则本隐私政策中使用的术语' +
              '与我们的注册服务协议具有相同的含义。'}
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            1.1 注册信息
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            创建账户时，需要您提供数据，包括您的电子邮箱，电话，密码或其他信息。如果您无法提供上述信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            1.2 支付信息
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            您的支付信息将发送至我们的第三方支付处理商，您的使用视为授权我们可以通过我们的第三方支付处理商访问并保留用户信息。
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            1.3 日志信息
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            {'KeyPool可能会自动记录有关您如何使用我们产品的某些信息（“日志数据”）。此日志数据可能包括以' +
              '下信息：您的计算机的互联网协议（“IP”）地址、浏览器类型、浏览器版本、您访问的服务的页面、访' +
              '问时间和日期、在这些页面上花费的时间和其他统计数据。此外，我们可能会使用GoogleAnalytics等' +
              '第三方服务来收集、监控和分析此类信息，以提升我们服务的功能性。这些第三方服务提供商有自己的隐' +
              '私政策来说明他们如何使用此类信息。这些第三方服务提供商只能在代表我们执行任务所需时查看使用您' +
              '的个人数据。'}
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography className={classes.title}>
            2.我们可能如何使用您的信息
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            我们可能会使用您提供的个人信息用于下列目的：
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （1）向您展示我们的网站及其内容;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （2）将您识别为我们系统中的用户;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （3）处理您的订单;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （4）提供客户服务;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （5）回应您的要求;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （6）为您提供产品更新;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （7）改善我们的网站;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （8）发送与我们产品相关的新闻通讯，调查，优惠和其他宣传材料;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （9）与您沟通;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （10）管理风险并保护本网站，我们的服务和您免受欺诈;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （11）遵守所有适用的法律和法规，并执行本网站和KeyPool注册服务协议;
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            （12）其他征得您同意的目的。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            3.我们可能披露的信息
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (a)经您事先同意，向第三方披露；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (c)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (d)如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (e)如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (f)在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决；
          </Typography>
        </Box>
        <Box >
          <Typography className={classes.des}>
            (g)其它本应用根据法律、法规或者网站政策认为合适的披露。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            4.Cookie的使用
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'为了使您获得更好的网站访问体验，我们使用“Cookie”来允许本网站识别您的浏览器并存储用户偏好和' +
              '其他信息。如果您的浏览器或浏览器附加服务允许，您可修改对Cookie的接受程度或拒绝我们的Cookie。' +
              '有关详情，请参见AboutCookies.org。但如果您这么做，在某些情况下可能会影响您访问我们网站的体验' +
              '或无法使用我们部分的服务。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            5.第三方服务提供商
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'我们可能会聘请第三方公司为我提供业务相关服务。这些第三方只能在为我们提供服务的期间访问您的个' +
              '人数据，并且有义务不得透露或将其用于任何其他目的。但我们向三方服务商提供您个人数据的行为，不' +
              '视为我们对三方服务商的用户信息侵权或隐私侵权行为承担任何法律责任。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            6.如果您是欧洲经济区（EEA）的居民
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'如果您是欧洲经济区（EEA）的居民，根据适用法律法规您拥有一些特定的数据保护权利。我们的目标是' +
              '采取合理的措施，允许您更正，修改，删除或限制您的个人数据的使用。如果您希望了解我们持有的关于' +
              '您的个人数据以及您希望将您的个人信息从我们的系统中删除，请与我们联系。但我们不对任何欧洲经济' +
              '区（EEA）的居民的数据操作行为，承担任何法律责任。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            7.信息安全
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'虽然我们致力于保护我们的网站和服务，但您有责任保护和维护您的个人信息安全，并验证我们维护的有' +
              '关您的个人信息是否准确和最新。您必须防止未经授权访问您的帐户。使用共享计算机时请务必注销，并' +
              '且不要向未经授权的人员披露您的帐户密码和任何其他帐户注册信息。' +
              '然而，没有一个通过因特网传输的方法或电子存储方法是100％安全的。因此，在我们尽力保护您的个人' +
              '信息的同时，我们无法保证其绝对的安全性。我们无法保证您传输到我们网站和/或通过我们的服务的个' +
              '人信息的安全性。任何个人信息的传输均由您自行承担风险。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            8.国际数据传输
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            通过提交您的信息，您同意您的信息（包括个人数据）可能会传输和保存到您所在国家/地区管辖范围之外的计算机和系统。若发生该等传输，我们会尽力确保您的信息得到和您所在国家/地区规定的程度基本一致的保护。但我们无法对该种保护行为所带来的结果承担任何法律责任。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            9.第三方链接
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            我们的服务可能包含链接指向非我们运营的第三方网站。如果您点击第三方链接，您将被引导至该第三方网站。本隐私政策不适用于其他第三方网站。我们强烈建议您查看所访问的网站的隐私政策。KeyPool无法管控任何第三方网站或服务的内容和隐私政策，也不承担任何责任。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            10.儿童隐私
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'我们不会故意从16岁以下的人士收集或维护我们网站上的个人数据，并且我们网站的任何部分都不会针' +
              '对16岁以下的人士。如果您未满16岁或已满16周岁但不以自己的劳动收入为主要收入来源的，请不要' +
              '以任何方式使用或访问本网站。当我们得知我们无意中收集了16岁以下的人士的个人数据时，我们会根' +
              '据适用法律法规进行删除或采取其他合适的措施。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            11.个人数据使用目的变更
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'如果我们决定将您的个人数据用于本隐私政策声明以外的任何其他目的，我们将进行通知并为您提供一个' +
              '有效的退出途径，供您选择不让自己的个人数据用于本隐私政策规定外的其他目的。' +
              '我们可能会向您发送有关新服务和新活动的电子邮件。您可以在我们发送的每封电子邮件中选择“取消订' +
              '阅”功能来拒绝接收KeyPool的宣传性电子邮件。但是，您同意使用服务的用户应继续接收与服务相关的' +
              '其他重要电子邮件。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            12.信息保存时间
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'除非适用法律法规有存留要求，我们只会在达成本政策所述目的所需的期限内保留和存储您的个人信息。' +
              '在法律允许的情况下，我们可能会存储一定的个人信息用于备案或通过法律途径保障自身的权益。我们的' +
              '信息存储行为均是按照法律、法规的要求来行使，我们不对信息存储的行为承担任何法律上的责任。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            13.如何了解，获取，更改或删除您的个人信息
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            如果您想确认我们正在处理您的数据，访问我们可能拥有的有关您的个人数据，更正我们收集的您的个人信息，或删除我们收集的您的个人信息，您可以使用本隐私政策规定的联系方式与我们联系。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            14.如何联系我们
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            我们欢迎您就本政策提出意见或问题，您可以通过以下方式联系我们：support@keypool.com。
          </Typography>
        </Box>
      </div>
    </div>
  );
};
