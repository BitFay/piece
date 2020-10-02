import React from 'react';
import Banner from './banner';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tabs from "./tabs";
import List from "./list";
import {Theme} from "@/components/theme";
import {getUser} from '@fay-react/lib/user';
import { User } from '../user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  content: {
    padding: theme.spacing(2)
  }
}));

export default () => {
  const classes = useStyles();
  const userFromCookie: User = getUser();
  const [user, setUser] = React.useState<User|null>(null);
  const [installed, setInstalled] = React.useState(true);
  const installButton = React.useRef<any>();
  
  React.useEffect(() => {
    setUser(userFromCookie);
  }, [JSON.stringify(userFromCookie)]);

  React.useEffect(() => {
    let deferredPrompt: any;
    const installBtnDom = installButton.current;
    console.log('addBtn', installBtnDom);
    // addBtn.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log(e);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      // addBtn.style.display = 'block';
      setInstalled(false);
      installBtnDom.addEventListener('click', (_e: any) => {
        // hide our user interface that shows our A2HS button
        setInstalled(true);
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }, []);

  return (
    <div className={classes.root}>
      <Banner user={user}/>
      {
        user &&
        <>
          <Tabs/>
          <div className={classes.content}>
            <List/>
          </div>
        </>
      }
      <Box className={classes.content} style={{display: installed?'none':'block'}}>
        <Button fullWidth variant={"contained"} color={"primary"} ref={installButton}>安装此应用到本地</Button>
      </Box>
    </div>
  )
}