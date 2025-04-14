import { InfoCard } from '../../components/InfoCard'
import { InfoItem } from '../../components/InfoItem'

export const CompletedTransactionPage = () => {
  return (
    <InfoCard>
      <InfoItem title="Вы отправили" description="1000$" status="Успешно"></InfoItem>
      <InfoItem title="Вы получили" description="0.02092615 BTC" status="Успешно"></InfoItem>
      <InfoItem title="Комиссия обменника" description="0.0003120 BTC"></InfoItem>
      <InfoItem title="Комиссия майнеров" description="0.000006 BTC"></InfoItem>
      <InfoItem
        title="Назначение платежа"
        description="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
      ></InfoItem>
      <InfoItem title="Обменный курс" description="1 USDT = 0.00002151 BTC"></InfoItem>
    </InfoCard>
  )
}
