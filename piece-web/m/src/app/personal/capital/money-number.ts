export const getAccuracy = (currency: string) => {
  switch (currency) {
    case 'BTC':
      return 8;
    case 'ETH':
      return 8;
    case 'LTC':
      return 8;
    case 'BCH':
      return 8;
    case 'USDT(OMNI)':
      return 8;
    case 'USDT(ERC20)':
      return 6;
    case 'BNB':
      return 8;
    case 'USD':
      return 2;
    default:
      return 2;
  }
};

export const transferValue = (value: string | undefined | null, orign: string) => {
  if (value === "" || value === undefined || value === null) {
    return "";
  }
  if (value === ".") {
    return "0.";
  }
  if (value.charAt(0) === "0") {
    if(value.length === 2 && value.charAt(1) === ".") { // 0.
      return value;
    }
    if(value.length === 2 && /^[0-9]*$/.test(value.charAt(1))) { // 02
      return value.substring(1, value.length);
    }
    if(value.length > 2 && value.charAt(1) === "." && !/^[0-9]*$/.test(value.charAt(2))) { // 0..
      return "0.";
    }
  }
  value = value.replace(/,/g, "");
  let point = "";
  if (value.charAt(value.length -1) === ".") {
    const list = value.match(/\./g);
    if (list && list.length === 1) {
      point = ".";
      value = value.replace(/\./, "");
    } else {
      return orign;
    }
  }
  if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(value)) {
    let money: any = Number.parseFloat(value)
    if (money > 1) {
      money = money.toLocaleString()
    } else {
      money = value;
    }
    if (Number.parseFloat(value.split(".")[1]) === 0) {
      money = value
    }
    if(money.replace(/,/g, "").split(".")[0].length > 15) {
      return orign;
    }
    if (point === ".") {
      return String(money)+".";
    } else {
      const pointMoney = money.split(".")[1] ? money.split(".")[1] : "0"
      let pointValue = value.split(".")[1]
      if (pointValue >= pointMoney) {
        if (pointValue.length > getAccuracy('FIL')) {
          pointValue = pointValue.substring(0, getAccuracy('FIL'));
        }
        return money.split(".")[0] + "." + pointValue;
      } else {
        return money === "0" ? value : String(money);
      }
    }
  }
  return orign;
}