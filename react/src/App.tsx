import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import { NotFoundPage } from './components/NotFoundPage'
import { MainLayout } from './MainLayout'
import { ExchangePage } from './pages/exchange/ExchangePage'
import { CompletedTransactionPage } from './pages/completed-transaction/CompletedTransactionPage'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExchangePage />} />
          <Route path="/completed_transaction" element={<CompletedTransactionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App