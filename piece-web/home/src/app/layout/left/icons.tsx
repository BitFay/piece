import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShareIcon from '@material-ui/icons/Share';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import PetsIcon from '@material-ui/icons/Pets';

interface Icons {
  [key: string]: React.ReactElement
}

const icons: Icons ={
  'dashboard': <DashboardIcon fontSize={"small"}/>,
  'share': <ShareIcon fontSize={"small"}/>,
  'enhancedEncryption': <EnhancedEncryptionIcon fontSize={"small"}/>,
  'remove': <DeleteIcon fontSize={"small"}/>,
  'setting': <SettingsIcon fontSize={"small"}/>,
  'pets': <PetsIcon fontSize={"small"}/>,
};

export default icons;