import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    out: {
      position: 'absolute',
    },
    outContent: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    outContentHover: {
      fill: theme.palette.primary.main,
    },
    direction: {
      position: 'absolute',
      top: '21.3px',
      left: 14,
      fill: theme.palette.grey[500],
      '&:hover': {
        cursor: 'pointer'
      },
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    directionHover: {
      fill: theme.palette.common.white,
    },
    directionRight: {
      transform: 'rotate(180deg)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }
  }),
);
interface Props {
  direction: 'left' | 'right',
  onClick: (event: any) => void,
  className: string
}

export default function TypographyMenu({direction, onClick, ...props}: Props) {
  const classes = useStyles();
  const [outHover, setOutHover] = React.useState(false);
  const [directionHover, setDirectionHover] = React.useState(false);
  const hover = outHover || directionHover;

  return (
    <div {...props}>
      <svg id="svg" width="44" height="60" className={classes.out}>
        <defs>
          <path d="M196,898 C202.627417,898 208,892.627417 208,886 L208,934 C208,927.372583 202.627417,922 196,922 C189.372583,922 184,916.627417 184,910 C184,903.372583 189.372583,898 196,898 Z" id="path-1"/>
          <filter x="-64.6%" y="-30.2%" width="229.2%" height="164.6%" filterUnits="objectBoundingBox" id="filter-2">
            <feMorphology radius="0.5" operator="erode" in="SourceAlpha" result="shadowSpreadOuter1"/>
            <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>
            <feColorMatrix values="0 0 0 0 0.129411765   0 0 0 0 0.129411765   0 0 0 0 0.129411765  0 0 0 0.16 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"/>
            <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter2"/>
            <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter2" result="shadowBlurOuter2"/>
            <feColorMatrix values="0 0 0 0 0.129411765   0 0 0 0 0.129411765   0 0 0 0 0.129411765  0 0 0 0.08 0" type="matrix" in="shadowBlurOuter2" result="shadowMatrixOuter2"/>
            <feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter3"/>
            <feGaussianBlur stdDeviation="2.5" in="shadowOffsetOuter3" result="shadowBlurOuter3"/>
            <feColorMatrix values="0 0 0 0 0.129411765   0 0 0 0 0.129411765   0 0 0 0 0.129411765  0 0 0 0.1 0" type="matrix" in="shadowBlurOuter3" result="shadowMatrixOuter3"/>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"/>
              <feMergeNode in="shadowMatrixOuter2"/>
              <feMergeNode in="shadowMatrixOuter3"/>
            </feMerge>
          </filter>
        </defs>
        <g id="钱包列表" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="钱包详情" transform="translate(-174.000000, -881.000000)">
            <g id="形状结合">
              <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"/>
              <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"
                   className={clsx(classes.outContent, {[classes.outContentHover]: hover})}
                   onMouseOver={() => setOutHover(true)}
                   onMouseLeave={() => setOutHover(false)}
                   onMouseDown={onClick}
              />
            </g>
          </g>
        </g>
      </svg>
      <svg className={clsx(classes.direction, {[classes.directionHover]: hover}, {[classes.directionRight]: direction==='right'})} viewBox="0 0 1024 1024" version="1.1" width="15" height="15" onMouseOver={() => setDirectionHover(true)} onMouseLeave={() => setDirectionHover(false)} onMouseDown={onClick}>
        <path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512S793.6 1024 512 1024zM512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z" />
        <path d="M554.666667 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8l-128-128c-17.066667-17.066667-17.066667-42.666667 0-59.733333l128-128c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733333L486.4 512l98.133333 98.133333c17.066667 17.066667 17.066667 42.666667 0 59.733333C576 678.4 567.466667 682.666667 554.666667 682.666667z" />
      </svg>
    </div>
  );
}
