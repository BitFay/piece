export interface TradeJnl {
  createdOn: string
  info: string
  jnlId: number
  jnlType: 'MiningIncome' | 'MiningFeeIncome' | 'Withdraw'
  number: number
  status: 'WaitAudit' | 'Success' | 'Reject'
  symbol: string
}