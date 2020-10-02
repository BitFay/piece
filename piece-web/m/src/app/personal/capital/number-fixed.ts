export const splitNumber = (num: number | string) => {
  if (!num) return '0.00';
  let list = (num + '').split('.');
  if (list.length < 2) {
    list.push('00')
  } else {
    let s = list[1];
    if (s.length < 2) {
      s = s + '0'
    } else {
      s = s.substring(0, 2)
    }
    list[1] = s;
  }
  const r = list.join('.');
  return r;
};