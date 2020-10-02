import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import clsx from 'clsx';
import AddButton from '@/components/button/add';
import UploadComponent from './upload-component';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  input: {
    display: 'none',
  },
  alert: {
    backgroundColor: '#FFFFFF'
  }
}));

export default ({className, onRefresh}: any) => {
  const classes = useStyles();
  const [files, setFiles] = React.useState<any[]>([]);

  const handleChange = async (e: any) => {
    setFiles([...files, e.target.files[0]]);
  }

  const handleComplete = (index: number) => {
    // files[index] = null;
    const _files = [...files];
    _files[index] = null;
    setFiles(_files);
  }
  const hasNullNumber = files.filter((file) => file===null).length;
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
      <Snackbar open={files.length>0 && files.length>hasNullNumber} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert className={classes.alert} elevation={6} variant="outlined" icon={false}>
          {
            files.map((f: File|null, index: number) => {
              if(f!==null){
                return (
                  <UploadComponent index={index} file={f} key={index} onRefresh={onRefresh} onComplete={handleComplete}/>
                )
              }else{
                return <React.Fragment key={index}></React.Fragment>;
              }
            })
          }
        </Alert>
      </Snackbar>
    </div>
  )
}