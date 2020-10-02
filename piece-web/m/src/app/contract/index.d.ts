import {Product} from '../product/index.d';

export interface Contract{
  createdOn: string
  holdUnits: number
  id: string
  product: Product
  productName: string
  status: string
  userId: string
  serviceFee: number
  serviceFeeDesc: string
  transferServiceFeeRateDesc?: string
  canTransfer?: boolean
}

export interface TransferDetail {
  targetUserName: string
  totalMiningFeeIncome: number
  transferDate: string
  transferUnit: number
}