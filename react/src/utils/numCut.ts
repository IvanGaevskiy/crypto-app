import Decimal from "decimal.js"

export const numCut = (num: Decimal) => {
  return new Decimal(num.gt("1") ? num.toFixed(2) : num.toFixed(8))
}
