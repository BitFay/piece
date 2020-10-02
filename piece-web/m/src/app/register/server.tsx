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
            {'KeyPool注册服务协议（以下简称“本协议”）是由用户与KeyPool就KeyPool的各项服务所订立的相关' +
              '权利义务规范。用户通过访问和/或使用本网站，即表示接受并同意本协议的所有条件和条款。KeyPool有' +
              '权对本协议条款进行修改，修改后的协议一旦公布即有效代替原来的协议。用户可随时查阅最新协议。'}
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography className={classes.title}>
            服务内容
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            1.KeyPool运用自己的系统，通过互联网等方式为用户提供矿机租赁和托管及其他未来可能新增的服务产品。
          </Typography>
          <Typography className={classes.des}>
            2.对于用户提供的注册资料，用户同意：（1）提供合法、真实、准确、详尽的个人资料；（2）如有变动，及时更新用户资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，KeyPool保留终止用户使用KeyPool各项服务的权利。
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography className={classes.title}>
            服务的提供、修改及终止
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            1.用户在接受KeyPool各项服务的同时，同意接受KeyPool提供的各类信息服务。用户在此授权可以向其电子邮件、手机、通信地址等发送商业信息。用户可以进入KeyPool相关页面对用户资料进行更改。
          </Typography>
          <Typography className={classes.des}>
            2.KeyPool保留随时修改或中断服务而不需通知用户的权利。KeyPool有权行使修改或中断服务的权利，不需对用户或任何无直接关系的第三方负责。
          </Typography>
          <Typography className={classes.des}>
            {'3.用户对本协议的修改有异议，或对KeyPool的服务不满，可以行使如下权利：（1）停止使用KeyPool' +
              '的网络服务；（2）通过客服等渠道告知KeyPool停止对其服务。结束服务后，用户使用KeyPool网络' +
              '服务的权利立即终止。在此情况下，KeyPool没有义务传送任何未处理的信息或未完成的服务给用户' +
              '或任何无直接关系的第三方。'}
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography className={classes.title}>
            信息保密
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'1.本协议所称之KeyPool用户信息是指符合法律、法规及相关规定，并符合下述范围的信息：（1）用户' +
              '注册KeyPool时，向KeyPool提供的个人信息；（2）用户在使用KeyPool服务、参加网站活动或访问' +
              '网站网页时，KeyPool自动接收并记录的用户浏览器端或手机客户端数据，包括但不限于IP地址、网' +
              '站Cookie中的资料及用户要求取用的网页记录；（3）KeyPool从商业伙伴处合法获取的用户个人信' +
              '息；（4）其它KeyPool通过合法途径获取的用户个人信息。'}
          </Typography>
          <Typography className={classes.des}>
            2.KeyPool承诺：非经法定原因或用户事先许可，KeyPool不会向任何第三方透露用户的密码、姓名、手机号码等非公开信息。
          </Typography>
          <Typography className={classes.des}>
            {'3.在下述法定情况下，用户的个人信息可能会被部分或全部披露：（1）经用户同意向用户本人或其他第' +
              '三方披露；（2）根据法律、法规等相关规定，或行政机构要求，向行政、司法机构或其他法律规定的' +
              '第三方披露；（3）其它KeyPool根据法律、法规等相关规定进行的披露。'}
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            用户权利
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'1.用户的用户名、密码和安全性（1）用户有权选择是否成为KeyPool注册用户，用户选择成为KeyPool' +
              '注册用户的，可自行创建账户。账户的命名及使用应遵守相关法律法规并符合网络道德。账户中不能' +
              '含有任何侮辱、威胁、淫秽、谩骂等侵害他人合法权益的文字;（2）用户一旦注册成功，成为' +
              'KeyPool注册用户，将得到账户（手机号或邮箱）和密码，并对以此组账户和密码登入系统后所发生的' +
              '所有活动和事件负责，自行承担一切使用该账户的言语、行为等而直接或者间接导致的法律责任;' +
              '（3）用户有义务妥善保管KeyPool账号和密码、短信验证码、谷歌验证码，用户将对用户名和密码、' +
              '和谷歌密钥安全负全部责任。因用户原因导致用户名或密码、谷歌密钥泄露而造成的任何法律后果由' +
              '用户本人负责，由于用户自身原因泄露这些信息导致的财产损失，本站不负相关责任;（4）用户密码' +
              '遗失的，可以通过注册电子邮箱发送的链接重置密码。用户若发现任何非法使用账户或存在其他安全' +
              '漏洞的情况，应立即告知KeyPool。'}
          </Typography>
          <Typography className={classes.des}>
            2.KeyPool承诺：非经法定原因或用户事先许可，KeyPool不会向任何第三方透露用户的密码、姓名、手机号码等非公开信息。
          </Typography>
          <Typography className={classes.des}>
            3.用户有权参加KeyPool组织提供的各项线上、线下活动。
          </Typography>
          <Typography className={classes.des}>
            4.用户有权根据KeyPool网站规定，享受KeyPool提供的其它各类服务。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            用户义务
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'1.不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用' +
              '本站制作、复制和传播下列信息：（1）煽动抗拒、破坏宪法和法律、行政法规实施的；（2）煽动颠' +
              '覆国家政权，推翻社会主义制度的；（3）煽动分裂国家、破坏国家统一的；（4）煽动民族仇恨、民' +
              '族歧视，破坏民族团结的；（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；（6）宣扬封建迷' +
              '信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；（7）公然侮辱他人或者捏造事实诽谤他人' +
              '的，或者进行其他恶意攻击的；（8）损害国家机关信誉的；（9）其他违反宪法和法律行政法规的；' +
              '（10）进行商业广告行为的。'}
          </Typography>
          <Typography className={classes.des}>
            {'2.用户不得通过任何手段恶意注册KeyPool网站帐号，包括但不限于以牟利、炒作、套现、获奖等为目' +
              '的多个账号注册。用户亦不得盗用其他用户帐号。如用户违反上述规定，则KeyPool有权直接采取一' +
              '切必要的措施，取消因违规所获利益，乃至通过诉讼形式追究用户法律责任等。'}
          </Typography>
          <Typography className={classes.des}>
            3.禁止用户将KeyPool以任何形式作为从事各种非法活动的场所、平台或媒介。未经KeyPool的授权或许可，用户不得借用本站的名义从事任何商业活动，也不得以任何形式将KeyPool作为从事商业活动的场所、平台或媒介。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            免责条款
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            {'1.基于互联网的特殊性，KeyPool不担保服务不会受中断，对服务的及时性、安全性都不作担保，不承' +
              '担非因KeyPool导致的责任。KeyPool力图使用户能对本网站进行安全访问和使用，但KeyPool不声' +
              '明也不保证本网站或其服务器是不含病毒或其它潜在有害因素的；因此用户应使用业界公认的软件查' +
              '杀任何自KeyPool下载文件中的病毒。KeyPool不对互联网安全承担任何责任或提供任何责任担保，' +
              '尤其是黑客入侵的行为或任何类似的行为，我们亦无法承担任何责任。'}
          </Typography>
          <Typography className={classes.des}>
            2.KeyPool不对用户所发布信息的保存、修改、删除或储存失败负责。对网站上的非因KeyPool故意所导致的排字错误、疏忽等不承担责任。KeyPool有权但无义务，改善或更正本网站任何部分之疏漏、错误
          </Typography>
          <Typography className={classes.des}>
            {'3.除非KeyPool以书面形式明确约定，KeyPool对于用户以任何方式（包括但不限于包含、经由、连接' +
              '或下载）从本网站所获得的任何内容信息，包括但不限于广告等，不保证其准确性、完整性、可靠性；' +
              '对于用户因本网站上的内容信息而购买、获取的任何产品、服务、信息或资料，KeyPool不承担责任。' +
              '用户自行承担使用本网站信息内容所导致的风险。'}
          </Typography>
          <Typography className={classes.des}>
            4.所有发给用户的通告，KeyPool都将通过正式的页面公告、站内信、电子邮件、客服电话、手机短信或常规的信件送达。任何非经KeyPool正规渠道获得的中奖、优惠等活动或信息，KeyPool不承担法律责任。
          </Typography>
        </Box>

        <Box mt={5}>
          <Typography className={classes.title}>
            适用法律和裁判地点
          </Typography>
        </Box>
        <Box mt={2.5}>
          <Typography className={classes.des}>
            本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。凡因本协议引起的或与本协议有关的任何争议，均应提交海南仲裁委员会进行仲裁。
          </Typography>
        </Box>
      </div>
    </div>
  );
};
