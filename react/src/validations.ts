import {
  EMAIL_ERROR,
  KYC_AML_ERROR,
  MAX_GET_ERROR,
  MAX_SEND_ERROR,
  MIN_GET_ERROR,
  MIN_SEND_ERROR,
  RECIPIENT_ADDRESS_ERROR
} from './constanst'

import Decimal from 'decimal.js'

export const isValidAmountFrom = (
  amount: string,
  minFrom: string,
  maxFrom: string
): string | null => {
  const amountDcml = new Decimal(amount)
  const isValidMin = amountDcml.gte(minFrom)
  const isValidMax = amountDcml.lte(maxFrom)

  if (!isValidMin) return MIN_SEND_ERROR
  if (!isValidMax) return MAX_SEND_ERROR

  return null
}

export const isValidAmountTo = (amount: string, minTo: string, maxTo: string): string | null => {
  const amountDcml = new Decimal(amount)
  const isValidMin = amountDcml.gte(minTo)
  const isValidMax = amountDcml.lte(maxTo)

  if (!isValidMin) return MIN_GET_ERROR
  if (!isValidMax) return MAX_GET_ERROR

  return null
}

export const isValidPurposePay = (address: string): string | null => {
  const isRegexP2PKH = /^[A-Za-z0-9]{26,35}$/.test(address)
  const isRegexP2SH = /^[A-Za-z0-9]{26,35}$/.test(address)
  const isRegexP2WPKH = /^[A-Za-z0-9]{42}$/.test(address)

  if (isRegexP2PKH || isRegexP2SH || isRegexP2WPKH) {
    return null
  }

  return RECIPIENT_ADDRESS_ERROR
}

export const isValidEmail = (email: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (emailRegex.test(email)) {
    return null
  }

  return EMAIL_ERROR
}

export const isValidKYCAndAML = (checkboxes: boolean[]): string | null => {
  if (checkboxes.some((checkbox) => !checkbox)) {
    return KYC_AML_ERROR
  }

  return null
}
