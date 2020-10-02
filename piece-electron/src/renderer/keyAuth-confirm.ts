import * as eventCommand from '../event-command/keyAuth-event';
import {ipcRenderer} from "./electron";
import * as channels from "../channel/keyAuth";

const deviceAudit = (eventName: string, data: any[]) => {
  return ipcRenderer.invoke(channels.KEY_AUTH_CONFIRM, {eventName, data});
}

const auditCreateSubWallet: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_CREATE_SUB_WALLET, data);
};

const auditCreateTransaction: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_CREATE_TRANSACTION, data);
};

const auditTransferAuditor: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_TRANSFER_AUDITOR, data);
};

const auditResetTransferAuditor: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_RESET_TRANSFER_AUDITOR, data);
};

const auditAddReceiptPerson: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_ADD_RECEIPT_PERSON, data);
};

const auditEditReceiptPerson: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_EDIT_RECEIPT_PERSON, data);
};

const auditOrgPriKeyHolder: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_ORG_PRI_KEY_HOLDER, data);
};

const auditBackupKeyShare: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.AUDIT_BACKUP_KEY_SHARE, data);
};

const addSubWallet: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.ADD_SUB_WALLET, data);
};

const createTransaction: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.CREATE_TRANSACTION, data);
};

const editTransferAuditors: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_TRANSFER_AUDITORS, data);
};

const resetTransferAuditors: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.RESET_TRANSFER_AUDITORS, data);
};

const editWalletManagers: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_WALLET_MANAGERS, data);
};

const editTransferAndReceivePersons: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_TRANSFER_AND_RECEIVE_PERSONS, data);
};

const editWalletOtherManagers: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_WALLET_OTHER_MANAGERS, data);
};

const createPayee: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.DEVICE_CREATE_PAYEE, data);
};

const deletePayee: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.DEVICE_DELETE_PAYEE, data);
};

const updatePayee: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.DEVICE_UPDATE_PAYEE, data);
};

const addMember: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.ADD_MEMBER, data);
};

const removeMember: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.REMOVE_MEMBER, data);
};

const updateMember: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.UPDATE_MEMBER, data);
};

const editWorkspaceManager: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_WORKSPACE_MANAGER, data);
};

const editPriKeyHolder: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.EDIT_PRI_KEY_HOLDER, data);
};

const initiateBackupKeyShare: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.INITIATE_BACKUP_KEY_SHARE, data);
};

const getReceiptAddress: (data: any[]) => Promise<any> = (data: any[]) => {
  console.log(eventCommand.GET_RECEIPT_ADDRESS, data);
  return deviceAudit(eventCommand.GET_RECEIPT_ADDRESS, data);
};

const createOrganization: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.CREATE_ORGANIZATION, data);
};

const generateRootWallet: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.GENERATE_ROOT_WALLET, data);
};

const login: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.LOGIN, data);
};

const importBackupData: (data: any[]) => Promise<any> = (data: any[]) => {
  return deviceAudit(eventCommand.IMPORT_BACKUP_DATA, data);
};

export default {
  auditCreateSubWallet,
  auditCreateTransaction,
  auditTransferAuditor,
  auditResetTransferAuditor,
  auditAddReceiptPerson,
  auditEditReceiptPerson,
  auditOrgPriKeyHolder,
  auditBackupKeyShare,
  addSubWallet,
  createTransaction,
  editTransferAuditors,
  resetTransferAuditors,
  editWalletManagers,
  editTransferAndReceivePersons,
  editWalletOtherManagers,
  createPayee,
  deletePayee,
  updatePayee,
  addMember,
  removeMember,
  updateMember,
  editWorkspaceManager,
  editPriKeyHolder,
  initiateBackupKeyShare,
  getReceiptAddress,
  createOrganization,
  generateRootWallet,
  login,
  importBackupData,
};