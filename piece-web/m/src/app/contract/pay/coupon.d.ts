export interface Coupon {
  "applicableProduct": number,
  "applicableUser": number,
  "code": string,
  "conditionAmountForAmt": string,
  "conditionAmountForPct": string,
  "conditionDiscountForAmt": string,
  "conditionDiscountForPct": string,
  "createdOn": string,
  "desc": string,
  "discountPrice": number,
  "discountType": "Price" | "Percent" | "Amount",
  "discountUnitsQuota": number,
  "expireTime": string,
  "id": string,
  "maxUseCount": number,
  "name": string,
  "remainUseCount": number,
  "status": "Normal" | "Invalid",
  "unitsRemainQuota": number,
  "couponFormula": string,
  "orderAmountAfterDiscount": number,
  "discountCondition": number,
  "discountQuota": number,
  "discountValue": number,
  "couponStatus": "Normal" | "Invalid",
}