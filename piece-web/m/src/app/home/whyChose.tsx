import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme } from '@/components/theme';
import ViewGrow from '@/components/view-grow';
import { PATH_PREFIX } from '@/env';
import SecurityLevel3Icon from '@/components/icons/home/security-level3';
import CloudIcon from '@/components/icons/home/cloud';
import LightningIcon from '@/components/icons/home/lightning';
import NetworkIcon from '@/components/icons/home/network';
import N1Icon from '@/components/icons/home/n+1';
import MonitorIcon from '@/components/icons/home/monitor';
import PublicDataIcon from '@/components/icons/home/public-data';
import OutIcon from '@/components/icons/home/out';
import OsIcon from '@/components/icons/home/os';
import CustomizedSpeedIcon from '@/components/icons/home/customized-speed';
import HardDiskIcon from '@/components/icons/home/hard-disk';
import AmdIcon from '@/components/icons/home/amd';
import MemoryIcon from '@/components/icons/home/memory';
import FaultIcon from '@/components/icons/home/fault';
import DeployIcon from '@/components/icons/home/deploy';
import DebuggerIcon from '@/components/icons/home/debugger';
import UpgradeIcon from '@/components/icons/home/upgrade';
import UpdateIcon from '@/components/icons/home/update';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 2, 5, 2),

  },
  item: {
    // display: "flex",
    // justifyContent: "center"
  },
  itemTxt: {
    width: '33%'
  },
  title1: {
    fontSize: '1.25rem',
    fontWeight: 600,
    textAlign: "center"
  },
  title1Desc: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  titlebody: {
    fontSize: '0.875rem',
    color: theme.colors.deepGrey
  },
  title2: {
    fontWeight: 600
  },
  img: {
    width: '100%',
  },
  itemDesc: {
    background: theme.palette.grey[100]
  },
  itemChildren: {
    // display: "flex",
    // flexWrap: "wrap",
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  borderRight: {
    borderRight: `3px solid ${theme.palette.grey[800]}`,
    borderImage: `linear-gradient(${theme.palette.grey[800]},${theme.palette.grey[50]}) 0 30`
  },
  borderLeft: {
    borderLeft: `3px solid ${theme.palette.grey[800]}`,
    borderImage: `linear-gradient(${theme.palette.grey[800]},${theme.palette.grey[50]}) 0 30`
  },
  iconText: {
    fontSize: '0.75rem'
  }
}));

const data = [{
  imgSrc: `${PATH_PREFIX}/static/home/why/1.png`,
  title: "安全高效",
  desc: "T4级IDC标准建设，集群化架构灵活管理，算法优化一键升级。",
  children: [{
    icon: CloudIcon,
    text: "弹性存储空间"
  }, {
    icon: SecurityLevel3Icon,
    text: "三级安全防护"
  }, {
    icon: LightningIcon,
    text: "稳定电力供应"
  }, {
    icon: NetworkIcon,
    text: "优质网络资源"
  }, {
    icon: N1Icon,
    text: "n+1式冗余部署"
  }]
}, {
  imgSrc: `${PATH_PREFIX}/static/home/why/2.png`,
  title: "稳定收益",
  desc: "实时查看算力运行及每日收益情况，支持收益即时提取。",
  children: [{
    icon: MonitorIcon,
    text: "算力实时监控"
  }, {
    icon: PublicDataIcon,
    text: "公开链上数据"
  }, {
    icon: OutIcon,
    text: "收益即时提取"
  }]
}, {
  imgSrc: `${PATH_PREFIX}/static/home/why/3.png`,
  title: "可拓展，高性能",
  desc: "搭载自主研发的Marlin OS及KeyPool定制加速硬件，配备企业级硬盘，服务器级处理器及内存，深度优化挖矿稳定和效率。",
  children: [{
    icon: OsIcon,
    text: "Marlin OS"
  }, {
    icon: CustomizedSpeedIcon,
    text: "定制加速硬件"
  }, {
    icon: HardDiskIcon,
    text: "企业级硬盘"
  }, {
    icon: AmdIcon,
    text: "AMD Infinity"
  }, {
    icon: MemoryIcon,
    text: "服务器级内存"
  }]
}, {
  imgSrc: `${PATH_PREFIX}/static/home/why/4.png`,
  title: "专业运维",
  desc: "专业运营团队7×24管理，全方位数据监控，软硬件及时升级。",
  children: [{
    icon: FaultIcon,
    text: "故障排除"
  }, {
    icon: DeployIcon,
    text: "网络部署"
  }, {
    icon: DebuggerIcon,
    text: "安装调试"
  }, {
    icon: UpgradeIcon,
    text: "软件更新"
  }, {
    icon: UpdateIcon,
    text: "硬件升级"
  }]
}];

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <ViewGrow>
        <Box>
          <Box pb={2}>
            <Typography className={classes.title1}>为什么选择KeyPool</Typography>
          </Box>
          <Box className={classes.title1Desc}>
            <Typography variant={"body2"} className={classes.titlebody}>
            KeyPool是由资深区块链金融产品人员、边缘计算及数据存储专家打造的基于Filecoin网络的技术服务平台。我们与国内多家Tier4级IDC紧密合作，最大程度地规避设备服务中断风险，同时承载KeyPool自主研发的Filecoin集群化部署算法方案，充分保障稳定的挖矿收益和存储服务。
            </Typography>
          </Box>
        </Box>
      </ViewGrow>
      <div>
        {
          data.map((item, index) => {
            return (
              <Box pt={5} key={index} className={classes.item}>
                <ViewGrow>
                  <img src={item.imgSrc} className={classes.img} />
                </ViewGrow>
                <ViewGrow>
                  <Box mt={2} p={2} className={clsx(classes.itemDesc, classes.borderLeft)}>
                    <Box pb={1}>
                      <Typography className={classes.title2}>{item.title}</Typography>
                    </Box>
                    <Typography variant={"body2"} align={"left"} className={classes.titlebody}>
                      {item.desc}
                    </Typography>
                    <Box className={classes.itemChildren}>
                      <Grid container spacing={5}>
                        {
                          item.children.map((item2, index2) => {
                            const Icon = item2.icon;
                            return (
                              <Grid key={index2} item className={classes.itemTxt}>
                                <Icon />
                                <Typography variant={"body2"} className={classes.iconText}>{item2.text}</Typography>
                              </Grid>
                            )
                          })
                        }
                      </Grid>

                    </Box>
                  </Box>
                </ViewGrow>
              </Box>
            )
          })
        }
      </div>
    </Box>
  )
}