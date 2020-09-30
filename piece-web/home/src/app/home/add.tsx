import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert,{AlertProps} from "@material-ui/lab/Alert";
import clsx from 'clsx';
import AddButton from '@/components/button/add';
import {BASE_URL} from '@/env';
import {getUser} from '@fay-react/lib/user';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  input: {
    display: 'none',
  },
}));

export default ({className, onRefresh}: any) => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleChange = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log(getUser());
    try {
      const fetchRes = await fetch(BASE_URL+'/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': getUser().token
        }
      });
      const result = await fetchRes.json();
      if(result.error){
        setError(result.errorCode);
      }else{
        setSuccess(true);
        onRefresh();
      }
    } catch (error) {
      setError('Upload has failed!');
    }
  }

  const handleClose = () => {
    setSuccess(false);
    setError('');
  }

  return (
    <div className={clsx(classes.root, className)}>
      <input
        accept="*/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <AddButton onClick={() => document.getElementById('contained-button-file')!.click()}/>
      </label>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Upload was successful!
        </Alert>
      </Snackbar>
      <Snackbar open={error.length>0} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}