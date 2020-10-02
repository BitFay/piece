import * as keyAuthChannels from '../channel/keyAuth';
import {RESET, ADD_BACKUP_KEY_AUTH_LISTENING} from "../channel/keyAuth";

export const AUDIT_CREATE_SUB_WALLET = 'keyAuth/auditCreateSubWallet';
export const AUDIT_CREATE_TRANSACTION = 'keyAuth/auditCreateTransaction';
export const AUDIT_TRANSFER_AUDITOR = 'keyAuth/auditTransferAuditor';
export const AUDIT_RESET_TRANSFER_AUDITOR = 'keyAuth/auditResetTransferAuditor';
export const AUDIT_ADD_RECEIPT_PERSON = 'keyAuth/auditAddReceiptPerson';
export const AUDIT_EDIT_RECEIPT_PERSON = 'keyAuth/auditEditReceiptPerson';
export const AUDIT_ORG_PRI_KEY_HOLDER = 'keyAuth/auditOrgPriKeyHolder';
export const AUDIT_BACKUP_KEY_SHARE = 'keyAuth/AuditBackupKeyShare';
export const ADD_SUB_WALLET = 'keyAuth/AddSubWallet';
export const CREATE_TRANSACTION = 'keyAuth/CreateTransaction';
export const EDIT_TRANSFER_AUDITORS = 'keyAuth/editTransferAuditors';
export const RESET_TRANSFER_AUDITORS = 'keyAuth/resetTransferAuditors';
export const EDIT_WALLET_MANAGERS = 'keyAuth/editWalletManagers';
export const EDIT_TRANSFER_AND_RECEIVE_PERSONS = 'keyAuth/editTransferAndReceivePersons';
export const EDIT_WALLET_OTHER_MANAGERS = 'keyAuth/editWalletOtherManagers';
export const DEVICE_CREATE_PAYEE = 'keyAuth/CreatePayee';
export const DEVICE_DELETE_PAYEE = 'keyAuth/DeletePayee';
export const DEVICE_UPDATE_PAYEE = 'keyAuth/UpdatePayee';
export const ADD_MEMBER = 'keyAuth/addMember';
export const REMOVE_MEMBER = 'keyAuth/removeMember';
export const UPDATE_MEMBER = 'keyAuth/updateMember';
export const EDIT_WORKSPACE_MANAGER = 'keyAuth/editWorkspaceManager';
export const EDIT_PRI_KEY_HOLDER = 'keyAuth/editPriKeyHolder';
export const INITIATE_BACKUP_KEY_SHARE = 'keyAuth/InitiateBackupKeyShare';
export const GET_RECEIPT_ADDRESS = 'device/GetReceiptAddress';
export const CREATE_ORGANIZATION = 'device/createOrganization';
export const GENERATE_ROOT_WALLET = 'device/generateRootWallet';
export const LOGIN = 'device/login';
export const IMPORT_BACKUP_DATA = 'device/importBackupData';

export const getCommandByEventName = (eventName: string) => {
  switch (eventName) {
    case AUDIT_CREATE_SUB_WALLET:
      return 'AuditCreateSubWallet';
    case AUDIT_CREATE_TRANSACTION:
      return 'AuditCreateTransaction';
    case AUDIT_TRANSFER_AUDITOR:
      return 'AuditTransferAuditor';
    case AUDIT_RESET_TRANSFER_AUDITOR:
      return 'AuditResetTransferAuditor';
    case AUDIT_ADD_RECEIPT_PERSON:
      return 'AuditCreatePayee';
    case AUDIT_EDIT_RECEIPT_PERSON:
      return 'AuditEditPayee';
    case AUDIT_ORG_PRI_KEY_HOLDER:
      return 'AuditWalletAuditor';
    case AUDIT_BACKUP_KEY_SHARE:
      return 'AuditBackupKeyShare';
    case ADD_SUB_WALLET:
      return 'GenerateSubWallet';
    case CREATE_TRANSACTION:
      return 'CreateTransaction';
    case EDIT_TRANSFER_AUDITORS:
      return 'EditTransferAuditor';
    case RESET_TRANSFER_AUDITORS:
      return 'InitiateResetTransferAuditor';
    case EDIT_WALLET_MANAGERS:
      return 'ChangeWalletMainManager';
    case EDIT_TRANSFER_AND_RECEIVE_PERSONS:
      return 'ChangeCoinReceiptManager';
    case EDIT_WALLET_OTHER_MANAGERS:
      return 'ChangeWalletOtherManager';
    case DEVICE_CREATE_PAYEE:
      return 'CreatePayee';
    case DEVICE_DELETE_PAYEE:
      return 'DeletePayee';
    case DEVICE_UPDATE_PAYEE:
      return 'UpdatePayee';
    case ADD_MEMBER:
      return 'AddMember';
    case REMOVE_MEMBER:
      return 'DeleteMember';
    case UPDATE_MEMBER:
      return 'UpdateMember';
    case EDIT_WORKSPACE_MANAGER:
      return 'ChangeOrgSubManager';
    case EDIT_PRI_KEY_HOLDER:
      return 'EditWalletAuditor';
    case INITIATE_BACKUP_KEY_SHARE:
      return 'InitiateBackupKeyShare';
    case GET_RECEIPT_ADDRESS:
      return 'CreateReceipt';
    case CREATE_ORGANIZATION:
      return 'CreateOrganization';
    case GENERATE_ROOT_WALLET:
      return 'GenerateRootWallet';
    case LOGIN:
      return 'Login';
    case IMPORT_BACKUP_DATA:
      return 'ImportBackupData';
    case RESET:
      return 'SystemReset';
    default:
      return null;
  }
}

export const getChannelNameByCommandReplyEventName = (commandReplyEventName: string) => {
  switch (commandReplyEventName) {
    case 'Confirmed':
      return keyAuthChannels.KEY_AUTH_CONFIRM;
    case 'Rejected':
      return keyAuthChannels.KEY_AUTH_CONFIRM;
    case 'BackupKeyAuthData':
      return ADD_BACKUP_KEY_AUTH_LISTENING;
    case 'SystemReset':
      return RESET;
    default:
      return null;
  }
}

