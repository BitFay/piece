import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '../text-field';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import { Subject } from 'rxjs';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative'
  },
  img: {
    width: 28,
    padding: 0,
  }
}));
interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
  max?: number,
  min?: number,
  value?: any
}
let clickSubject: Subject<unknown>;
const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, max, min, ...other } = props;

  const [maxLength, setMaxLength] = React.useState<number | undefined>(undefined);
  const [minLength, setMinLength] = React.useState<number | undefined>(undefined);

  clickSubject = new Subject();
  React.useEffect(() => {
    clickSubject
      .subscribe((bol: any) => {
        let value = props.value;
        if (!value) value = 0;
        if (Number.parseInt(value) >= 0) {
          if (bol) {
            value = Number.parseInt(value) + 1
          } else {
            value = Number.parseInt(value) - 1
            value = value >= 0 ? value : 0
          }
        }
        onChange({
          target: { value },
        });
      })
  })
  const handleValueChange = (values: any) => {
    let value = values.value;
    if (max && Number(values.value) > max) {
      value = max;
      setMaxLength((max + '').length + Math.floor((max + '').length / 3) - ((max + '').length % 3 === 0 ? 1 : 0));
    } else if (min && Number(values.value) < min) {
      value = min;
      setMinLength((min + '').length + Math.floor((min + '').length / 3) - ((min + '').length % 3 === 0 ? 1 : 0) - 1);
    } else {
      setMaxLength(undefined);
      setMinLength(undefined);
    }
    if (!value) return;
    onChange({
      target: {
        value,
      },
    });
  }

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={handleValueChange}
      thousandSeparator
      isNumericString
      maxLength={maxLength}
      minLength={minLength}
      style={{ textAlign: 'center', borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0', margin: '0px 6px' }}
    />
  );
};

export default ({ InputProps, ...props }: any) => {
  const classes = useStyles({});
  return (
    <Box className={classes.root}>
      <TextField
        InputProps={{
          inputComponent: NumberFormatCustom,
          startAdornment: <InputAdornment position="start" ><Remove className={classes.img} onClick={() => clickSubject.next(false)} /></InputAdornment>,
          endAdornment: <InputAdornment position="end" ><Add className={classes.img} onClick={() => clickSubject.next(true)} /></InputAdornment>,
          ...InputProps,
        }}
        variant='outlined'
        {...props}
      />
      <Typography style={{position: 'absolute', color: '#757575', fontSize: '0.75rem', bottom: 0, left: '50%', marginBottom: 16, marginLeft: String(props.value).length * 5 + 8 }}>TB</Typography>
    </Box>
  );
}