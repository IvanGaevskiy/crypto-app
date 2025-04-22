import { useLocation } from 'react-router-dom';
import { InfoCard } from '../../components/InfoCard'
import { InfoItem } from '../../components/InfoItem'
import { useRouter } from '../../utils/userouter'
import { ResponseCreateTransaction } from '../exchange/ExchangeRequests'
import { EX_FEE, TX_FEE } from '../../constanst';

export const CompletedTransactionPage = () => {
  const location = useLocation();
  const response: ResponseCreateTransaction = location.state;
  const {
    // id,
    currency_from: currencyFrom,
    amount_from: amountFrom,
    currency_to: currencyTo,
    amount_to: amountTo,
    rate,
    recipient_address: recipientAddress,
    // status,
  } = response; 

  const { push } = useRouter()
  return (
    <InfoCard onClick={() => push('/')}>
      <InfoItem title="Вы отправили" description={`${amountFrom} ${currencyFrom}`} status="Успешно"></InfoItem>
      <InfoItem title="Вы получили" description={`${amountTo} ${currencyTo}`} status="Успешно"></InfoItem>
      <InfoItem title="Комиссия обменника" description={`${EX_FEE} %`}></InfoItem>
      <InfoItem title="Комиссия майнеров" description={`${TX_FEE} BTC`}></InfoItem>
      <InfoItem
        title="Назначение платежа"
        description={recipientAddress}
        breakAll
      ></InfoItem>
      <InfoItem title="Обменный курс" description={`1 ${currencyFrom} = ${rate} ${currencyTo}`}></InfoItem>
    </InfoCard>
  )
}
