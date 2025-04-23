import { useGlobalStore } from '../../utils/useGlobalStore'
import { useRouter } from '../../utils/userouter'
import { createTransaction } from './ExchangeRequests'

export const useSendTransaction = () => {
  const globalStore = useGlobalStore()
  const { push } = useRouter()

  return async () => {
    const { amountFrom, amountTo } = globalStore
    const { isKYC, isAML } = globalStore
    const { purposePay } = globalStore
    const { email } = globalStore
    const { setIsSubmit } = globalStore
    const { courseFrom } = globalStore
    const { currencyFrom, currencyTo } = globalStore

    try {
      const response = await createTransaction({
        currency_from: currencyFrom.curr,
        amount_from: amountFrom,
        currency_to: currencyTo.curr,
        amount_to: amountTo,
        rate: courseFrom,
        recorded_at: new Date().toISOString(),
        recipient_address: purposePay,
        email: email,
        agreements: [
          { agreement_type: 'KYC', approved: isKYC.toString() },
          { agreement_type: 'AML', approved: isAML.toString() }
        ]
      })
      push('/completed_transaction', response)
    } catch (error) {
      push('/404')
    } finally {
      setIsSubmit(false)
    }
  }
}
